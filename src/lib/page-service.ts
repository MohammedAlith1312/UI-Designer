import { ScreenSchema } from '@/types/schema';

export interface UserPage {
    id: string;
    route: string;
    title: string;
    name?: string;
    schema: ScreenSchema;
    metadata?: any;
    is_published?: boolean;
    created_at?: Date | string;
    updated_at?: Date | string;
    app_id?: string;
}

/**
 * Client-safe PageService that only makes API calls
 * All database logic is handled by the API routes
 */
export const PageService = {
    getPages: async (): Promise<UserPage[]> => {
        const res = await fetch('/api/pages');
        if (!res.ok) return [];
        return res.json();
    },

    getPage: async (identifier: string): Promise<UserPage | undefined> => {
        const res = await fetch(`/api/pages/${identifier}`);
        if (!res.ok) return undefined;
        return res.json();
    },

    savePage: async (page: any) => {
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
