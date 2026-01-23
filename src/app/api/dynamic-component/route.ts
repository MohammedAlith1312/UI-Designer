import { NextResponse } from 'next/server';
import { ComponentService } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    try {
        const components = await ComponentService.getComponents(category);
        return NextResponse.json(components);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validation could go here
        const newComponent = await ComponentService.saveComponent(body);
        return NextResponse.json(newComponent, { status: 201 });
    } catch (error) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: 'Failed to save component' }, { status: 500 });
    }
}
