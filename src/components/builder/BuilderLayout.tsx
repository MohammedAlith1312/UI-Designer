"use client";

import React, { useState } from "react";
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useEditor } from "@/lib/builder-context";
import BuilderSidebar from "./Sidebar";
import BuilderCanvas from "./Canvas";
import PropertyPanel from "@/app/builder/panels/PropertyPanel";

export default function BuilderLayout() {
    const { addComponent, viewMode, setViewMode, schema, saveSchema, isSaving } = useEditor();
    const [activeDragItem, setActiveDragItem] = useState<any>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Prevent accidental drags
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        // We expect data to be attached to the draggable node
        if (event.active.data.current) {
            setActiveDragItem(event.active.data.current);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDragItem(null);

        if (over && active.data.current) {
            // Dropped over a valid container
            // The over.id is the container ID
            console.log("Dropped", active.data.current.type, "into", over.id);
            addComponent(over.id as string, active.data.current.type);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col h-screen w-full overflow-hidden font-sans text-zinc-900 bg-white">
                {/* Header */}
                <header className="h-14 border-b border-zinc-200 bg-white flex items-center justify-between px-4 shrink-0 z-40 relative shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h1 className="font-bold text-zinc-800 text-sm tracking-tight leading-none">Website Builder</h1>
                            <span className="text-[10px] text-zinc-400 font-medium">Untitled Project</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-zinc-100 rounded-md p-0.5 mr-2">
                            <button
                                onClick={() => setViewMode('desktop')}
                                className={`p-1.5 rounded transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                                title="Desktop View"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </button>
                            <button
                                onClick={() => setViewMode('tablet')}
                                className={`p-1.5 rounded transition-all ${viewMode === 'tablet' ? 'bg-white shadow-sm text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                                title="Tablet View"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </button>
                            <button
                                onClick={() => setViewMode('mobile')}
                                className={`p-1.5 rounded transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-zinc-800' : 'text-zinc-400 hover:text-zinc-600'}`}
                                title="Mobile View"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </button>
                        </div>

                        <div className="h-6 w-px bg-zinc-200 mx-1" />

                        <button
                            onClick={() => saveSchema()}
                            disabled={isSaving}
                            className={`text-xs font-semibold px-3 py-1.5 rounded transition-all flex items-center gap-2 border border-zinc-200 shadow-sm
                                ${isSaving ? 'bg-zinc-50 text-zinc-400 cursor-not-allowed' : 'bg-white text-zinc-700 hover:text-indigo-600 hover:border-indigo-200'}
                            `}
                        >
                            {isSaving ? (
                                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 1m0-1l-3-1m0 0l-3 1m0 0l-3-1m0-1V4a2 2 0 012-2h5a2 2 0 012 2v5" /></svg>
                            )}
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>

                        <button
                            onClick={() => {
                                // Save current schema to local storage for the preview page to pick up
                                localStorage.setItem("builder_preview_schema", JSON.stringify(schema));
                                window.open("/preview", "_blank");
                            }}
                            className="text-xs font-semibold text-zinc-600 hover:text-indigo-600 px-3 py-1.5 rounded hover:bg-zinc-50 transition-all flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Preview
                        </button>
                        <button
                            onClick={() => alert("Publishing feature coming soon!")}
                            className="bg-zinc-900 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Publish
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>
                        </button>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    <BuilderSidebar />
                    <BuilderCanvas />
                    <PropertyPanel />
                </div>
            </div>

            <DragOverlay>
                {activeDragItem ? (
                    <div className="px-4 py-2 bg-white rounded-lg shadow-xl border-2 border-indigo-500 opacity-90 cursor-grabbing font-bold text-sm text-indigo-700 flex items-center gap-2 animate-pulse">
                        <span className="text-xl">{activeDragItem.icon || "📦"}</span>
                        <span>{activeDragItem.label || activeDragItem.type}</span>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
