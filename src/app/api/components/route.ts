import { NextRequest, NextResponse } from 'next/server';
import { ComponentService } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category') || undefined;
        const components = await ComponentService.getComponents(category);
        return NextResponse.json(components);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const component = await ComponentService.saveComponent(body);
        return NextResponse.json(component);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to save component' }, { status: 500 });
    }
}
