// components/DynamicRenderer.tsx

"use client";

import React from "react";
import ComponentRegistry from "@/lib/dynamic-ui/registry";
import { ScreenSchema, ComponentSchema } from "@/types/schema";
import { DynamicUIProvider } from "@/lib/dynamic-ui/context";
import { useDroppable } from "@dnd-kit/core";

const CONTAINER_TYPES = ["container", "stack", "grid", "column", "section", "hero-section", "feature-section", "footer-section", "cta-section"];

interface RenderProps {
    isEditor?: boolean;
    onSelect?: (node: ComponentSchema) => void;
    selectedId?: string | null;
}

/**
 * Recursive Node Renderer Component
 */
function NodeRenderer({ node, options }: { node: ComponentSchema, options: RenderProps }) {
    const Component = ComponentRegistry[node.type];
    const isContainer = CONTAINER_TYPES.includes(node.type) || node.type.endsWith("-section");

    // Dnd Hook (only active for containers in editor)
    const { setNodeRef, isOver } = useDroppable({
        id: node.id || "unknown",
        disabled: !options.isEditor || !isContainer,
        data: { type: node.type }
    });

    if (!Component) {
        return (
            <div className="p-4 border border-red-300 rounded-lg bg-red-50 text-red-700">
                Unknown component type: <strong>{node.type}</strong>
            </div>
        );
    }

    const props = {
        ...(node.props || {}),
        style: { ...(node.style || {}), ...(node.props?.style || {}) },
    };

    const children = (node.children && node.children.length > 0)
        ? node.children.map((child, index) => (
            <NodeRenderer key={child.id || index} node={child} options={options} />
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
                ref={isContainer ? setNodeRef : undefined}
                onClick={(e) => {
                    e.stopPropagation();
                    options.onSelect?.(node);
                }}
                className={`relative group transition-all duration-200 cursor-pointer 
                    ${isSelected
                        ? 'ring-2 ring-indigo-500 rounded-lg z-10'
                        : 'hover:ring-1 hover:ring-indigo-300 rounded-lg'
                    }
                    ${isOver ? 'bg-indigo-50/50 ring-2 ring-indigo-400 ring-offset-2' : ''}
                `}
            >
                {/* ID Tag on Hover/Select */}
                {isSelected && (
                    <div className="absolute -top-3 -right-2 bg-indigo-500 text-white text-[9px] px-1.5 py-0.5 rounded shadow-sm z-20 font-mono">
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
                {/* Render Root */}
                <NodeRenderer node={schema.root} options={{ isEditor, onSelect, selectedId }} />
            </div>
        </DynamicUIProvider>
    );
}
