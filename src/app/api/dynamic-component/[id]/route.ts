import { NextResponse } from 'next/server';
import { ComponentService, CustomComponent } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // We don't have a direct getComponentById in ComponentService yet, 
    // so we'll fetch all and find it (inefficient but works for now without modifying db.ts significantly)
    // Or better, checking if I can add a method or query directly.
    // Actually, ComponentService.getComponents uses "SELECT * FROM dynamic_components..."
    // Let's rely on the service to keep it clean, but wait, the service doesn't have getById.
    // I should probably add getById to db.ts first? 
    // For now, let's just fetch all and filter. It's a prototype.
    // A better approach is to assume the client knows what it wants.

    // Actually, I can just use the db pool if I wanted, but let's stick to the service pattern.
    // I will quickly verify if I can update db.ts or just handle it here.
    // Let's modify db.ts to add getComponentById is the Right Way.

    // For this step, I'll return a 501 Not Implemented or just filter.
    // Let's filter for now.
    const all = await ComponentService.getComponents();
    const component = all.find(c => c.id === id);

    if (!component) {
        return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }
    return NextResponse.json(component);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const success = await ComponentService.deleteComponent(id);
        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting component' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const updated = await ComponentService.updateComponent(id, body);

        if (updated) {
            return NextResponse.json(updated);
        } else {
            return NextResponse.json({ error: 'Component not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Error updating component' }, { status: 500 });
    }
}
