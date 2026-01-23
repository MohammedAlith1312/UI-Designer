// components/DynamicRenderer.tsx

"use client";

import React from "react";
import ComponentRegistry from "@/lib/dynamic-ui/registry";
import { ScreenSchema, ComponentSchema } from "@/types/schema";
import { DynamicUIProvider } from "@/lib/dynamic-ui/context";

/**
 * Renders a single schema node recursively.
 */
interface RenderProps {
    isEditor?: boolean;
    onSelect?: (node: ComponentSchema) => void;
    selectedId?: string | null;
}

/**
 * Renders a single schema node recursively.
 */
function renderNode(node: ComponentSchema, options: RenderProps): React.ReactNode {
    const Component = ComponentRegistry[node.type];

    if (!Component) {
        return (
            <div className="p-4 border border-red-300 rounded-lg bg-red-50 text-red-700">
                Unknown component type: <strong>{node.type}</strong>
            </div>
        );
    }

    const props = {
        ...(node.props || {}),
        style: node.style, // Pass style through to component
    };

    const children = (node.children && node.children.length > 0)
        ? node.children.map((child, index) => (
            <React.Fragment key={child.id || index}>
                {renderNode(child, options)}
            </React.Fragment>
        ))
        : null;

    const content = (
        <Component {...props}>
            {children}
        </Component>
    );

    if (options.isEditor) {
        const isSelected = options.selectedId === node.id;
        return (
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    options.onSelect?.(node);
                }}
                className={`relative group transition-all duration-200 cursor-pointer 
                    ${isSelected
                        ? 'ring-2 ring-blue-500 rounded-lg z-10'
                        : 'hover:ring-1 hover:ring-blue-300 hover:bg-blue-50/10 rounded-lg'
                    }`}
            >
                {/* ID Tag on Hover/Select */}
                {(isSelected) && (
                    <div className="absolute -top-3 -right-2 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded shadow-sm z-20 font-mono">
                        {node.type}
                    </div>
                )}
                {content}
            </div>
        );
    }

    return content;
}

/**
 * Top-level Dynamic Renderer component.
 * Accepts a full ScreenSchema and renders it.
 */
export default function DynamicRenderer({
    schema,
    isEditor = false,
    onSelect,
    selectedId
}: {
    schema: ScreenSchema;
    isEditor?: boolean;
    onSelect?: (node: ComponentSchema) => void;
    selectedId?: string | null;
}) {
    return (
        <DynamicUIProvider>
            <div className="w-full">
                {schema.title && (
                    <h1 className="text-3xl font-bold mb-6 font-outfit text-zinc-900">{schema.title}</h1>
                )}
                {renderNode(schema.root, { isEditor, onSelect, selectedId })}
            </div>
        </DynamicUIProvider>
    );
}
