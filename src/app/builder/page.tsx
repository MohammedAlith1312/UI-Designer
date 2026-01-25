"use client";

import React, { useState } from "react";
import DynamicRenderer from "@/app/components/DynamicRendered";
import { EditorProvider, useEditor } from "@/lib/builder-context";
import PropertyPanel from "@/app/builder/panels/PropertyPanel";
import { findNode } from "@/lib/builder-utils";

// Top Bar for handling canvas settings (Responsive view, etc.)
function CanvasToolbar({ width, setWidth, onExport, onSave, isSaving }: { width: string, setWidth: (w: string) => void, onExport: () => void, onSave: () => void, isSaving: boolean }) {
    return (
        <div className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="ml-4 px-3 py-1 bg-zinc-100 rounded-md text-xs text-zinc-500 font-mono flex items-center gap-2 min-w-[300px]">
                    <span className="text-zinc-400">https://</span>
                    <span>my-app.dynamic.ui</span>
                    <span className="ml-auto opacity-50">/home</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onExport}
                        className="text-[11px] font-bold text-zinc-500 hover:text-zinc-700 px-3 py-1.5 rounded transition-colors"
                    >
                        JSON
                    </button>
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className={`text-[11px] font-bold text-white px-4 py-1.5 rounded shadow-sm transition-all
                            ${isSaving ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'}
                        `}
                    >
                        {isSaving ? 'Saving...' : 'Save Component'}
                    </button>
                </div>

                <div className="w-px h-6 bg-zinc-200"></div>

                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg">
                    <button
                        onClick={() => setWidth("100%")}
                        className={`p-1 rounded ${width === '100%' ? 'bg-white shadow text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                        title="Desktop"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </button>
                    <button
                        onClick={() => setWidth("768px")}
                        className={`p-1 rounded ${width === '768px' ? 'bg-white shadow text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                        title="Tablet"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </button>
                    <button
                        onClick={() => setWidth("375px")}
                        className={`p-1 rounded ${width === '375px' ? 'bg-white shadow text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                        title="Mobile"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Wrapper component to consume the context
function BuilderCanvas() {
    const { schema, selectComponent, selectedId } = useEditor();
    const [width, setWidth] = useState("100%");
    const [showOutput, setShowOutput] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const res = await fetch("/api/dynamic-component", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: schema.title || "Untitled Page",
                    category: "page",
                    schema: schema,
                    props_schema: {},
                    is_public: true
                })
            });
            if (res.ok) {
                alert("Saved successfully!");
            } else {
                alert("Failed to save to database.");
            }
        } catch (e) {
            console.error(e);
            alert("Error saving.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-zinc-100/50 h-screen overflow-hidden relative">
            <CanvasToolbar
                width={width}
                setWidth={setWidth}
                onExport={() => setShowOutput(true)}
                onSave={handleSave}
                isSaving={isSaving}
            />

            <div
                className="flex-1 overflow-y-auto p-8 flex justify-center items-start"
                onClick={() => selectComponent(null)}
            >
                <div
                    className="bg-white shadow-xl shadow-zinc-200/50 min-h-[800px] transition-all duration-300 ease-in-out origin-top border border-zinc-200"
                    style={{ width: width }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <DynamicRenderer
                        schema={schema}
                        isEditor={true}
                        onSelect={(node) => selectComponent(node.id || null)}
                        selectedId={selectedId}
                    />
                </div>
            </div>

            {/* Output Modal */}
            {showOutput && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-8">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80%] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 border-b flex justify-between items-center bg-zinc-50">
                            <div>
                                <h3 className="font-bold text-lg">Page Schema Output</h3>
                                <p className="text-xs text-zinc-500">This JSON defines your entire UI.</p>
                            </div>
                            <button
                                onClick={() => setShowOutput(false)}
                                className="p-2 hover:bg-zinc-200 rounded-lg transition-colors"
                            >
                                ✕ Close
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto bg-zinc-900 p-6 relative group">
                            <button
                                onClick={() => navigator.clipboard.writeText(JSON.stringify(schema, null, 2))}
                                className="absolute top-4 right-4 bg-white/10 text-white text-xs px-3 py-1 rounded hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all font-bold"
                            >
                                Copy to Clipboard
                            </button>
                            <pre className="text-zinc-100 font-mono text-xs leading-relaxed">
                                {JSON.stringify(schema, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Left Sidebar (Palette)
function ComponentPalette() {
    const { addComponent, selectedId, schema } = useEditor();

    // Context-aware target: 
    // If something is selected and it's a container-type, use it.
    let targetId = "root-container";
    if (selectedId) {
        const containerTypes = ["container", "grid", "stack", "card", "form", "form-group", "table", "table-head", "table-row"];
        const found = findNode(schema.root, selectedId);
        if (found && containerTypes.includes(found.type)) {
            targetId = selectedId;
        }
    }

    return (
        <div className="w-64 bg-white border-r border-zinc-200 h-screen flex flex-col z-20 shrink-0">
            <div className="p-4 border-b border-zinc-100">
                <h1 className="font-bold text-lg tracking-tight">Visual Builder</h1>
                <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-bold">Palette</p>
            </div>

            <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3">Layout</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <PaletteItem label="Container" onClick={() => addComponent(targetId, 'container')} />
                        <PaletteItem label="Grid" onClick={() => addComponent(targetId, 'grid')} />
                        <PaletteItem label="Card" onClick={() => addComponent(targetId, 'card')} />
                        <PaletteItem label="Stack" onClick={() => addComponent(targetId, 'stack')} />
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3 text-left">Form Elements</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <PaletteItem label="Form" onClick={() => addComponent(targetId, 'form')} />
                        <PaletteItem label="Group" onClick={() => addComponent(targetId, 'form-group')} />
                        <PaletteItem label="Input" onClick={() => addComponent(targetId, 'input')} />
                        <PaletteItem label="Textarea" onClick={() => addComponent(targetId, 'textarea')} />
                        <PaletteItem label="Dropdown" onClick={() => addComponent(targetId, 'select')} />
                        <PaletteItem label="Radio" onClick={() => addComponent(targetId, 'radio')} />
                        <PaletteItem label="Checkbox" onClick={() => addComponent(targetId, 'checkbox')} />
                        <PaletteItem label="Button" onClick={() => addComponent(targetId, 'button')} fullWidth />
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3 text-left">Table Structure</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <PaletteItem label="Table" onClick={() => addComponent(targetId, 'table')} />
                        <PaletteItem label="T-Head" onClick={() => addComponent(targetId, 'table-head')} />
                        <PaletteItem label="T-Row" onClick={() => addComponent(targetId, 'table-row')} />
                        <PaletteItem label="T-Cell" onClick={() => addComponent(targetId, 'table-cell')} />
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3 text-left">Basic</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <PaletteItem label="Heading" onClick={() => addComponent(targetId, 'heading')} />
                        <PaletteItem label="Text" onClick={() => addComponent(targetId, 'text')} />
                        <PaletteItem label="Button" onClick={() => addComponent(targetId, 'button')} />
                        <PaletteItem label="Link" onClick={() => addComponent(targetId, 'link')} />
                        <PaletteItem label="Image" onClick={() => addComponent(targetId, 'image')} />
                        <PaletteItem label="List" onClick={() => addComponent(targetId, 'list')} />
                        <PaletteItem label="Badge" onClick={() => addComponent(targetId, 'badge')} />
                        <PaletteItem label="Divider" onClick={() => addComponent(targetId, 'divider')} />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50">
                <p className="text-[10px] text-zinc-400 leading-tight">
                    Click an item to append it to the page.
                </p>
            </div>
        </div>
    );
}

function PaletteItem({ label, onClick, fullWidth }: { label: string, onClick: () => void, fullWidth?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`p-3 border border-zinc-200 rounded-lg text-sm text-zinc-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex flex-col items-center gap-2 text-center group
                ${fullWidth ? 'col-span-2' : ''}
            `}
        >
            <div className="w-8 h-8 bg-zinc-50 rounded flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-[10px] uppercase font-bold text-zinc-400 group-hover:text-blue-500">{label.substring(0, 2)}</span>
            </div>
            <span className="text-[11px] font-medium">{label}</span>
        </button>
    );
}

// Main Page Layout
export default function BuilderPage() {
    return (
        <EditorProvider>
            <div className="flex h-screen w-full overflow-hidden font-sans text-zinc-900">
                <ComponentPalette />
                <BuilderCanvas />
                <PropertyPanel />
            </div>
        </EditorProvider>
    );
}
