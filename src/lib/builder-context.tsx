"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ScreenSchema, ComponentSchema } from "@/types/schema";
import { updateNode, deleteNode, moveNode, appendChild, findNode } from "@/lib/builder-utils";

interface EditorContextType {
    schema: ScreenSchema;
    setSchema: (schema: ScreenSchema) => void;

    selectedId: string | null;
    selectComponent: (id: string | null) => void;

    hoveredId: string | null;
    setHoveredId: (id: string | null) => void;

    // Actions
    updateComponentProps: (id: string, props: any) => void;
    deleteComponent: (id: string) => void;
    moveComponent: (id: string, direction: 'up' | 'down') => void;
    addComponent: (parentId: string, type: any) => void; // Simplified type for now
    saveSchema: () => Promise<boolean>;
    isSaving: boolean;
    viewMode: 'desktop' | 'tablet' | 'mobile';
    setViewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const DEFAULT_SCHEMA: ScreenSchema = {
    screenId: "builder-canvas",
    title: "New Page",
    root: {
        id: "root-container",
        type: "container",
        props: { className: "min-h-screen bg-white" },
        children: []
    }
};

export const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [schema, setSchema] = useState<ScreenSchema>(DEFAULT_SCHEMA);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const selectComponent = useCallback((id: string | null) => {
        setSelectedId(id);
    }, []);

    const updateComponentProps = useCallback((id: string, newProps: any) => {
        setSchema((prev) => {
            const currentNode = findNode(prev.root, id);
            if (!currentNode) return prev;

            // Deep merge props, especially for nested objects like style
            const mergedProps = {
                ...currentNode.props,
                ...newProps,
                style: {
                    ...(currentNode.props?.style || {}),
                    ...(newProps.style || {})
                }
            };

            return {
                ...prev,
                root: updateNode(prev.root, id, { props: mergedProps })
            };
        });
    }, []);

    const deleteComponent = useCallback((id: string) => {
        setSchema((prev) => {
            // If trying to delete root, ignore (or handle gracefully)
            if (prev.root.id === id) return prev;
            return {
                ...prev,
                root: deleteNode(prev.root, id)
            };
        });
        setSelectedId(null); // Deselect after delete
    }, []);

    const moveComponent = useCallback((id: string, direction: 'up' | 'down') => {
        setSchema((prev) => ({
            ...prev,
            root: moveNode(prev.root, id, direction)
        }));
    }, []);

    // Action: Add a new component (or tree of components)
    const addComponent = useCallback((parentId: string, typeOrNode: any) => {
        let newComponent: ComponentSchema;

        if (typeof typeOrNode === 'string') {
            // It's a simple type string, create a default node
            const id = `${typeOrNode}-${Date.now().toString(36)}`;
            newComponent = {
                id,
                type: typeOrNode as any,
                props: { text: "New " + typeOrNode, content: "New Content" },
                children: []
            };
        } else {
            // It's already a full component object (template)
            // We need to ensure IDs are unique if we're cloning, but templates usually generate new IDs
            newComponent = typeOrNode;
        }

        setSchema((prev) => ({
            ...prev,
            root: appendChild(prev.root, parentId, newComponent)
        }));

        // Auto-select the new item (or its root)
        if (newComponent.id) {
            setSelectedId(newComponent.id);
        }
    }, []);

    const saveSchema = useCallback(async () => {
        try {
            setIsSaving(true);
            const res = await fetch("/api/dynamic-component", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: schema.title || "Untitled Builder Page",
                    category: "page",
                    schema: schema,
                    props_schema: {},
                    is_public: true
                })
            });
            if (res.ok) {
                console.log("✅ Schema saved to database");
                return true;
            }
            return false;
        } catch (e) {
            console.error("❌ Error saving schema:", e);
            return false;
        } finally {
            setIsSaving(false);
        }
    }, [schema]);

    return (
        <EditorContext.Provider value={{
            schema,
            setSchema,
            selectedId,
            selectComponent,
            hoveredId,
            setHoveredId,
            updateComponentProps,
            deleteComponent,
            moveComponent,
            addComponent,
            saveSchema,
            isSaving,
            viewMode,
            setViewMode
        }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) throw new Error("useEditor must be used within EditorProvider");
    return context;
};
