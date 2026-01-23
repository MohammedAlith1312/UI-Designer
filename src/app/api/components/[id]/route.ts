import { NextRequest, NextResponse } from 'next/server';
import { ComponentService } from '@/lib/db';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await ComponentService.deleteComponent(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to delete component' }, { status: 500 });
    }
}
