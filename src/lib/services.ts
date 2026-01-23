import { ScreenSchema } from '@/types/schema';

// Client-side interfaces (matching server)
export interface DynamicApp {
    id: string;
    name: string;
    slug: string;
    description?: string;
    pages?: AppPage[];
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
    route: string;
    schema: ScreenSchema;
    metadata?: any;
    order: number;
}

export interface CustomComponent {
    id: string;
    name: string;
    category: string;
    schema: any;
    props_schema: any;
    preview_url?: string;
    is_public: boolean;
    created_by?: string;
    created_at?: Date | string;
}

/**
 * Client-safe App Service - communicates with API routes
 */
export const AppService = {
    getApps: async (): Promise<DynamicApp[]> => {
        const res = await fetch('/api/apps');
        if (!res.ok) return [];
        return res.json();
    },

    getApp: async (identifier: string): Promise<DynamicApp | undefined> => {
        const res = await fetch(`/api/apps/${identifier}`);
        if (!res.ok) return undefined;
        return res.json();
    },

    saveApp: async (app: Partial<DynamicApp>) => {
        const res = await fetch('/api/apps', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(app)
        });
        if (!res.ok) throw new Error('Failed to save app');
        return res.json();
    },

    deleteApp: async (id: string) => {
        const res = await fetch(`/api/apps/${id}`, { method: 'DELETE' });
        return res.ok;
    }
};

/**
 * Client-safe Page Service
 */
export const PageService = {
    savePage: async (page: Partial<AppPage>) => {
        const res = await fetch('/api/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(page)
        });
        if (!res.ok) throw new Error('Failed to save page');
        return res.json();
    },

    deletePage: async (id: string) => {
        const res = await fetch(`/api/pages/${id}`, { method: 'DELETE' });
        return res.ok;
    }
};

/**
 * Client-safe Component Service
 */
export const ComponentService = {
    getComponents: async (category?: string): Promise<CustomComponent[]> => {
        const url = category ? `/api/components?category=${category}` : '/api/components';
        const res = await fetch(url);
        if (!res.ok) return [];
        return res.json();
    },

    saveComponent: async (component: Partial<CustomComponent>) => {
        const res = await fetch('/api/components', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(component)
        });
        if (!res.ok) throw new Error('Failed to save component');
        return res.json();
    },

    deleteComponent: async (id: string) => {
        const res = await fetch(`/api/components/${id}`, { method: 'DELETE' });
        return res.ok;
    }
};
