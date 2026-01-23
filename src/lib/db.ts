// This file has been deprecated.
// Client code should use '@/lib/page-service'
// Server/API code should use '@/lib/db-server'
import { Pool } from 'pg';
import { ScreenSchema } from '@/types/schema';

// Interfaces
export interface DynamicApp {
    id: string;
    name: string;
    slug: string;
    description?: string;
    pages: AppPage[];
    theme?: any;
    metadata?: any;
    is_published: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
}

export interface AppPage {
    id: string;
    app_id: string;
    name: string;
    route: string; // e.g., "/", "/dashboard", "/settings"
    schema: ScreenSchema;
    metadata?: any;
    order: number;
}

export interface CustomComponent {
    id: string;
    name: string;
    category: string; // 'form', 'display', 'layout', 'custom'
    schema: any; // The component's structure
    props_schema: any; // Defines what props it accepts
    preview_url?: string;
    is_public: boolean;
    created_by?: string;
    created_at?: Date | string;
}

// Create a single pool instance
let pool: Pool | null = null;

function getPool() {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 5,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 15000,
        });

        pool.on('error', (err) => {
            console.error('Database pool error:', err);
        });
    }
    return pool;
}

// Track initialization
let isInitialized = false;

async function ensureInitialized() {
    if (isInitialized) return;

    try {
        const pool = getPool();

        // Create apps table

        // Create apps table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dynamic_apps (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
              
                slug TEXT UNIQUE NOT NULL,
                description TEXT,
                theme JSONB DEFAULT '{}',
                metadata JSONB DEFAULT '{}',
                is_published BOOLEAN DEFAULT false,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_apps_slug ON dynamic_apps(slug);
        `);

        // Create pages table (belongs to apps)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dynamic_pages (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                app_id UUID REFERENCES dynamic_apps(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                route TEXT NOT NULL,
                schema JSONB NOT NULL,
                metadata JSONB DEFAULT '{}',
                "order" INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(app_id, route)
            );
            CREATE INDEX IF NOT EXISTS idx_pages_app ON dynamic_pages(app_id);
        `);

        // Create custom components table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS dynamic_components (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                schema JSONB NOT NULL,
                props_schema JSONB NOT NULL,
                preview_url TEXT,
                is_public BOOLEAN DEFAULT true,
                created_by TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_components_category ON dynamic_components(category);
        `);

        isInitialized = true;
        console.log('✅ Dynamic UI database initialized (Apps + Pages + Components)');
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
    }
}

/**
 * Server-only database operations for Apps
 */
export const AppService = {
    // Get all apps
    getApps: async (): Promise<DynamicApp[]> => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const result = await pool.query(
                'SELECT * FROM dynamic_apps ORDER BY created_at DESC'
            );
            return result.rows;
        } catch (error) {
            console.error('Error fetching apps:', error);
            return [];
        }
    },

    // Get single app with all its pages
    getApp: async (identifier: string): Promise<DynamicApp | undefined> => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
            const appQuery = isUuid
                ? 'SELECT * FROM dynamic_apps WHERE id = $1'
                : 'SELECT * FROM dynamic_apps WHERE slug = $1';

            const appResult = await pool.query(appQuery, [identifier]);
            if (appResult.rows.length === 0) return undefined;

            const app = appResult.rows[0];

            // Get all pages for this app
            const pagesResult = await pool.query(
                'SELECT * FROM dynamic_pages WHERE app_id = $1 ORDER BY "order", created_at',
                [app.id]
            );

            return {
                ...app,
                pages: pagesResult.rows
            };
        } catch (error) {
            console.error('Error fetching app:', error);
            return undefined;
        }
    },

    // Create or update app
    saveApp: async (app: Partial<DynamicApp>) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = `
                INSERT INTO dynamic_apps (slug, name, description, theme, metadata, is_published)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (slug) DO UPDATE SET
                    name = EXCLUDED.name,
                    description = EXCLUDED.description,
                    theme = EXCLUDED.theme,
                    metadata = EXCLUDED.metadata,
                    is_published = EXCLUDED.is_published,
                    updated_at = CURRENT_TIMESTAMP
                RETURNING *;
            `;

            const values = [
                app.slug,
                app.name,
                app.description || '',
                JSON.stringify(app.theme || {}),
                JSON.stringify(app.metadata || {}),
                app.is_published ?? false
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error saving app:', error);
            throw error;
        }
    },

    // Delete app (cascades to pages)
    deleteApp: async (id: string) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            await pool.query('DELETE FROM dynamic_apps WHERE id = $1', [id]);
            return true;
        } catch (error) {
            console.error('Error deleting app:', error);
            throw error;
        }
    }
};

/**
 * Server-only database operations for Pages
 */
export const PageService = {
    // Get all pages (optionally filtered by app_id)
    getPages: async (appId?: string): Promise<AppPage[]> => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = appId
                ? 'SELECT * FROM dynamic_pages WHERE app_id = $1 ORDER BY "order", created_at'
                : 'SELECT * FROM dynamic_pages ORDER BY created_at DESC';
            const params = appId ? [appId] : [];
            const result = await pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Error fetching pages:', error);
            return [];
        }
    },

    // Get single page by route or ID
    getPage: async (identifier: string): Promise<AppPage | undefined> => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

            if (isUuid) {
                const result = await pool.query('SELECT * FROM dynamic_pages WHERE id = $1', [identifier]);
                return result.rows[0];
            } else {
                const result = await pool.query('SELECT * FROM dynamic_pages WHERE route = $1', [identifier]);
                return result.rows[0];
            }
        } catch (error) {
            console.error('Error fetching page:', error);
            return undefined;
        }
    },
    // Save page to an app
    savePage: async (page: Partial<AppPage>) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = `
                INSERT INTO dynamic_pages (app_id, name, route, schema, metadata, "order")
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (app_id, route) DO UPDATE SET
                    name = EXCLUDED.name,
                    schema = EXCLUDED.schema,
                    metadata = EXCLUDED.metadata,
                    "order" = EXCLUDED."order",
                    updated_at = CURRENT_TIMESTAMP
                RETURNING *;
            `;

            const values = [
                page.app_id,
                page.name,
                page.route,
                JSON.stringify(page.schema),
                JSON.stringify(page.metadata || {}),
                page.order || 0
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error saving page:', error);
            throw error;
        }
    },

    // Delete page
    deletePage: async (id: string) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            await pool.query('DELETE FROM dynamic_pages WHERE id = $1', [id]);
            return true;
        } catch (error) {
            console.error('Error deleting page:', error);
            throw error;
        }
    },

    // Get page by App Slug and Route (Multitenancy)
    getPageByAppSlug: async (appSlug: string, route: string): Promise<AppPage | undefined> => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = `
                SELECT p.* 
                FROM dynamic_pages p
                JOIN dynamic_apps a ON p.app_id = a.id
                WHERE a.slug = $1 AND p.route = $2
            `;
            const result = await pool.query(query, [appSlug, route]);
            return result.rows[0];
        } catch (error) {
            console.error('Error fetching page by app slug:', error);
            return undefined;
        }
    }
};

/**
 * Server-only database operations for Custom Components
 */
export const ComponentService = {
    // Get all custom components
    getComponents: async (category?: string): Promise<CustomComponent[]> => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = category
                ? 'SELECT * FROM dynamic_components WHERE category = $1 ORDER BY name'
                : 'SELECT * FROM dynamic_components ORDER BY category, name';

            const result = category
                ? await pool.query(query, [category])
                : await pool.query(query);

            return result.rows;
        } catch (error) {
            console.error('Error fetching components:', error);
            return [];
        }
    },

    // Save custom component
    saveComponent: async (component: Partial<CustomComponent>) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = `
                INSERT INTO dynamic_components (name, category, schema, props_schema, preview_url, is_public, created_by)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;

            const values = [
                component.name,
                component.category,
                JSON.stringify(component.schema),
                JSON.stringify(component.props_schema),
                component.preview_url || null,
                component.is_public ?? true,
                component.created_by || 'system'
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error saving component:', error);
            throw error;
        }
    },

    // Delete custom component
    deleteComponent: async (id: string) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            await pool.query('DELETE FROM dynamic_components WHERE id = $1', [id]);
            return true;
        } catch (error) {
            console.error('Error deleting component:', error);
            throw error;
        }
    },

    // Update custom component
    updateComponent: async (id: string, component: Partial<CustomComponent>) => {
        await ensureInitialized();
        try {
            const pool = getPool();
            const query = `
                UPDATE dynamic_components 
                SET 
                    name = COALESCE($2, name),
                    category = COALESCE($3, category),
                    schema = COALESCE($4, schema),
                    props_schema = COALESCE($5, props_schema),
                    preview_url = COALESCE($6, preview_url),
                    is_public = COALESCE($7, is_public),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $1
                RETURNING *;
            `;

            const values = [
                id,
                component.name,
                component.category,
                component.schema ? JSON.stringify(component.schema) : null,
                component.props_schema ? JSON.stringify(component.props_schema) : null,
                component.preview_url,
                component.is_public
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating component:', error);
            throw error;
        }
    }
};
