"use client";

import React, { useEffect, useState } from "react";
import { useEditor } from "@/lib/builder-context";
import { ComponentSchema } from "@/types/schema";
import { findNode } from "@/lib/builder-utils";

export default function PropertyPanel() {
    const {
        selectedId,
        schema,
        updateComponentProps,
        deleteComponent,
        moveComponent,
        saveSchema,
        isSaving
    } = useEditor();

    const [node, setNode] = useState<ComponentSchema | null>(null);
    const [justSaved, setJustSaved] = useState(false);

    // Sync node when selection changes or schema updates
    useEffect(() => {
        if (selectedId) {
            const found = findNode(schema.root, selectedId);
            setNode(found);
            setJustSaved(false); // Reset save indicator
        } else {
            setNode(null);
        }
    }, [selectedId, schema]);

    const handleLocalSave = async () => {
        const success = await saveSchema();
        if (success) {
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
        }
    };

    if (!selectedId || !node) {
        return (
            <div className="w-80 bg-white border-l border-zinc-200 h-screen p-6 text-center text-zinc-400 text-sm flex flex-col justify-center shrink-0">
                <div className="mb-4 opacity-20">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                </div>
                Select an element on the canvas to edit its properties.
            </div>
        );
    }

    const handleChange = (key: string, value: any) => {
        if (!node) return;
        const newProps = { ...node.props, [key]: value };
        updateComponentProps(node.id!, newProps);
    };

    const handleStyleChange = (key: string, value: any) => {
        if (!node) return;
        const newStyle = { ...(node.style || {}), [key]: value };
        // We might need an updateComponentStyle in context, but for now we can use updateComponentProps pattern or similar
        // Let's assume style is part of the node structure we can update
        // I will use updateNode from builder-utils via a new context method or just update props for now if style is in props
        // Actually, schema.ts has 'style' as a top level property on ComponentSchema.
        // I should update builder-context to support updateComponentStyle.
        // For Phase 2, let's stick to props or add the context method.
    };

    return (
        <div className="w-80 bg-white border-l border-zinc-200 h-screen flex flex-col shrink-0">
            {/* Header with Actions */}
            <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">
                        {node.type}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => moveComponent(node.id!, 'up')}
                        className="p-1.5 hover:bg-zinc-200 rounded transition-colors text-zinc-500"
                        title="Move Up"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button
                        onClick={() => moveComponent(node.id!, 'down')}
                        className="p-1.5 hover:bg-zinc-200 rounded transition-colors text-zinc-500"
                        title="Move Down"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className="w-px h-4 bg-zinc-200 mx-1" />
                    <button
                        onClick={() => deleteComponent(node.id!)}
                        className="p-1.5 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded transition-colors"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">

                {/* ID Section */}
                <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Identity</label>
                    <div className="text-xs font-mono bg-zinc-50 p-2 rounded border border-zinc-100 text-zinc-500 truncate">
                        {node.id}
                    </div>
                </div>

                {/* Generic Text/Content Inputs */}
                {(node.props?.text !== undefined || node.props?.label !== undefined || node.props?.content !== undefined || node.props?.placeholder !== undefined) && (
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Content</label>

                        {node.props?.text !== undefined && (
                            <PropertyField label="Text">
                                <input
                                    type="text"
                                    value={node.props.text}
                                    onChange={(e) => handleChange("text", e.target.value)}
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none"
                                />
                            </PropertyField>
                        )}

                        {node.props?.label !== undefined && (
                            <PropertyField label="Label">
                                <input
                                    type="text"
                                    value={node.props.label}
                                    onChange={(e) => handleChange("label", e.target.value)}
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none"
                                />
                            </PropertyField>
                        )}

                        {node.props?.placeholder !== undefined && (
                            <PropertyField label="Placeholder">
                                <input
                                    type="text"
                                    value={node.props.placeholder}
                                    onChange={(e) => handleChange("placeholder", e.target.value)}
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none"
                                />
                            </PropertyField>
                        )}

                        {node.props?.content !== undefined && (
                            <PropertyField label="Content Body">
                                <textarea
                                    value={node.props.content}
                                    onChange={(e) => handleChange("content", e.target.value)}
                                    rows={4}
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none resize-none"
                                />
                            </PropertyField>
                        )}
                    </div>
                )}

                {/* Specific Settings based on Type */}
                <div className="space-y-4 pt-4 border-t border-zinc-100">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Settings</label>

                    {node.type === 'heading' && (
                        <PropertyField label="Hierarchy">
                            <select
                                value={node.props?.level || 1}
                                onChange={(e) => handleChange("level", parseInt(e.target.value))}
                                className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                            >
                                <option value={1}>Heading 1</option>
                                <option value={2}>Heading 2</option>
                                <option value={3}>Heading 3</option>
                                <option value={4}>Heading 4</option>
                            </select>
                        </PropertyField>
                    )}

                    {node.type === 'button' && (
                        <PropertyField label="Visual Variant">
                            <select
                                value={node.props?.variant || 'primary'}
                                onChange={(e) => handleChange("variant", e.target.value)}
                                className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                            >
                                <option value="primary">Primary (Blue)</option>
                                <option value="secondary">Secondary (Zinc)</option>
                                <option value="outline">Outline</option>
                                <option value="danger">Danger (Red)</option>
                            </select>
                        </PropertyField>
                    )}

                    {node.type === 'badge' && (
                        <PropertyField label="Badge Color">
                            <select
                                value={node.props?.variant || 'neutral'}
                                onChange={(e) => handleChange("variant", e.target.value)}
                                className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                            >
                                <option value="neutral">Neutral</option>
                                <option value="primary">Primary (Blue)</option>
                                <option value="success">Success (Green)</option>
                                <option value="warning">Warning (Yellow)</option>
                                <option value="error">Error (Red)</option>
                            </select>
                        </PropertyField>
                    )}

                    {node.type === 'table-cell' && (
                        <PropertyField label="Cell Type">
                            <div className="flex bg-zinc-100 p-1 rounded-lg">
                                <button
                                    onClick={() => handleChange("isHeader", false)}
                                    className={`flex-1 py-1 text-[10px] font-bold rounded ${!node.props?.isHeader ? 'bg-white shadow text-blue-600' : 'text-zinc-500'}`}
                                >DATA</button>
                                <button
                                    onClick={() => handleChange("isHeader", true)}
                                    className={`flex-1 py-1 text-[10px] font-bold rounded ${node.props?.isHeader ? 'bg-white shadow text-blue-600' : 'text-zinc-500'}`}
                                >HEADER</button>
                            </div>
                        </PropertyField>
                    )}

                    {node.type === 'form-group' && (
                        <PropertyField label="Field Label">
                            <input
                                type="text"
                                value={node.props?.label || ""}
                                onChange={(e) => handleChange("label", e.target.value)}
                                className="w-full text-sm border border-zinc-200 rounded p-2"
                            />
                        </PropertyField>
                    )}

                    {node.type === 'link' && (
                        <PropertyField label="URL">
                            <input
                                type="text"
                                value={node.props?.href || "#"}
                                onChange={(e) => handleChange("href", e.target.value)}
                                placeholder="https://example.com"
                                className="w-full text-sm border border-zinc-200 rounded p-2"
                            />
                        </PropertyField>
                    )}

                    {node.type === 'image' && (
                        <div className="space-y-4">
                            <PropertyField label="Image URL">
                                <input
                                    type="text"
                                    value={node.props?.src || ""}
                                    onChange={(e) => handleChange("src", e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full text-sm border border-zinc-200 rounded p-2"
                                />
                            </PropertyField>
                            <PropertyField label="Alt Text">
                                <input
                                    type="text"
                                    value={node.props?.alt || ""}
                                    onChange={(e) => handleChange("alt", e.target.value)}
                                    placeholder="Image description"
                                    className="w-full text-sm border border-zinc-200 rounded p-2"
                                />
                            </PropertyField>
                        </div>
                    )}

                    {node.type === 'list' && (
                        <div className="space-y-4">
                            <PropertyField label="List Type">
                                <div className="flex bg-zinc-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => handleChange("ordered", false)}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded ${!node.props?.ordered ? 'bg-white shadow text-blue-600' : 'text-zinc-500'}`}
                                    >BULLET</button>
                                    <button
                                        onClick={() => handleChange("ordered", true)}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded ${node.props?.ordered ? 'bg-white shadow text-blue-600' : 'text-zinc-500'}`}
                                    >NUMBERED</button>
                                </div>
                            </PropertyField>
                            <PropertyField label="List Items">
                                <div className="space-y-2">
                                    {(node.props?.items || []).map((item: string, idx: number) => (
                                        <div key={idx} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const newItems = [...(node.props?.items || [])];
                                                    newItems[idx] = e.target.value;
                                                    handleChange("items", newItems);
                                                }}
                                                className="flex-1 text-xs border border-zinc-200 rounded p-1.5"
                                            />
                                            <button
                                                onClick={() => {
                                                    const newItems = (node.props?.items || []).filter((_: any, i: number) => i !== idx);
                                                    handleChange("items", newItems);
                                                }}
                                                className="p-1 text-zinc-300 hover:text-red-500"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newItems = [...(node.props?.items || []), "New Item"];
                                            handleChange("items", newItems);
                                        }}
                                        className="w-full text-[10px] bg-blue-50 text-blue-600 px-2 py-1.5 rounded font-bold hover:bg-blue-100"
                                    >
                                        + ADD ITEM
                                    </button>
                                </div>
                            </PropertyField>
                        </div>
                    )}

                    {node.type === 'select' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Select Options</label>
                                <button
                                    onClick={() => {
                                        const currentOptions = node.props?.options || [];
                                        const newOptions = [...currentOptions, { label: "New Option", value: "option-" + Date.now() }];
                                        handleChange("options", newOptions);
                                    }}
                                    className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold hover:bg-blue-100"
                                >
                                    + ADD OPTION
                                </button>
                            </div>

                            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                                {(node.props?.options || []).map((opt: any, idx: number) => (
                                    <div key={idx} className="p-2 border border-zinc-100 rounded bg-zinc-50 space-y-2 relative group-item">
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <label className="text-[9px] text-zinc-400 uppercase font-bold">Label</label>
                                                <input
                                                    type="text"
                                                    value={opt.label}
                                                    onChange={(e) => {
                                                        const newOptions = [...(node.props?.options || [])];
                                                        newOptions[idx] = { ...opt, label: e.target.value };
                                                        handleChange("options", newOptions);
                                                    }}
                                                    className="w-full text-xs p-1 border border-zinc-200 rounded outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-[9px] text-zinc-400 uppercase font-bold">Value</label>
                                                <input
                                                    type="text"
                                                    value={opt.value}
                                                    onChange={(e) => {
                                                        const newOptions = [...(node.props?.options || [])];
                                                        newOptions[idx] = { ...opt, value: e.target.value };
                                                        handleChange("options", newOptions);
                                                    }}
                                                    className="w-full text-xs p-1 border border-zinc-200 rounded outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-end pb-0.5">
                                                <button
                                                    onClick={() => {
                                                        const isDefault = node.props?.defaultValue === opt.value;
                                                        handleChange("defaultValue", isDefault ? null : opt.value);
                                                    }}
                                                    className={`p-1 rounded transition-all border
                                                        ${node.props?.defaultValue === opt.value
                                                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                            : 'bg-white border-zinc-200 text-zinc-300 hover:border-blue-300 hover:text-blue-500'}
                                                    `}
                                                    title={node.props?.defaultValue === opt.value ? "Default Option" : "Set as Default"}
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newOptions = (node.props?.options || []).filter((_: any, i: number) => i !== idx);
                                                    handleChange("options", newOptions);
                                                    if (node.props?.defaultValue === opt.value) {
                                                        handleChange("defaultValue", null);
                                                    }
                                                }}
                                                className="self-end p-1 text-zinc-300 hover:text-red-500 transition-colors"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                        {node.props?.defaultValue === opt.value && (
                                            <div className="text-[8px] font-bold text-blue-600 uppercase tracking-tighter absolute -top-2 -right-1 bg-white px-1 shadow-sm border border-blue-100 rounded">
                                                Selected Default
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {(!node.props?.options || node.props.options.length === 0) && (
                                    <div className="text-[10px] text-center text-zinc-400 py-4 italic border border-dashed border-zinc-200 rounded">
                                        No options added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {node.type === 'input' && (
                        <PropertyField label="Field Type">
                            <select
                                value={node.props?.type || 'text'}
                                onChange={(e) => handleChange("type", e.target.value)}
                                className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                            >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="password">Password</option>
                                <option value="number">Number</option>
                                <option value="tel">Telephone</option>
                            </select>
                        </PropertyField>
                    )}

                    {node.type === 'stack' && (
                        <div className="space-y-4">
                            <PropertyField label="Direction">
                                <div className="flex bg-zinc-100 p-1 rounded-lg">
                                    <button
                                        onClick={() => handleChange("direction", "col")}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded ${node.props?.direction !== 'row' ? 'bg-white shadow text-blue-600' : 'text-zinc-500'}`}
                                    >VERTICAL</button>
                                    <button
                                        onClick={() => handleChange("direction", "row")}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded ${node.props?.direction === 'row' ? 'bg-white shadow text-blue-600' : 'text-zinc-500'}`}
                                    >HORIZONTAL</button>
                                </div>
                            </PropertyField>
                            <PropertyField label="Gap">
                                <select
                                    value={node.props?.gap || 4}
                                    onChange={(e) => handleChange("gap", parseInt(e.target.value))}
                                    className="w-full text-xs border border-zinc-200 rounded p-1.5 bg-white"
                                >
                                    {[0, 1, 2, 3, 4, 6, 8, 10].map(v => (
                                        <option key={v} value={v}>Gap {v}</option>
                                    ))}
                                </select>
                            </PropertyField>
                        </div>
                    )}

                    {node.type === 'grid' && (
                        <PropertyField label="Grid Columns">
                            <input
                                type="range"
                                min="1"
                                max="6"
                                step="1"
                                value={node.props?.columns || 1}
                                onChange={(e) => handleChange("columns", parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                                <span>1 col</span>
                                <span>6 cols</span>
                            </div>
                        </PropertyField>
                    )}
                </div>

                {/* Layout & Style Visual Controls */}
                <div className="space-y-4 pt-4 border-t border-zinc-100">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Layout & Style</label>
                        <div className="flex gap-1">
                            <button className="text-[9px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold hover:bg-blue-100 transition-colors">SAVE STYLE</button>
                            <button className="text-[9px] px-1.5 py-0.5 bg-zinc-50 text-zinc-500 rounded font-bold hover:bg-zinc-100 transition-colors">PRESETS</button>
                        </div>
                    </div>

                    <PropertyField label="Text Alignment">
                        <div className="flex bg-zinc-100 p-1 rounded-lg">
                            {['text-left', 'text-center', 'text-right'].map((align) => (
                                <button
                                    key={align}
                                    onClick={() => {
                                        const current = node.props?.className || "";
                                        const filtered = current.replace(/text-(left|center|right)/g, "").trim();
                                        handleChange("className", `${filtered} ${align}`.trim());
                                    }}
                                    className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all
                                        ${(node.props?.className || "").includes(align)
                                            ? 'bg-white shadow-sm text-blue-600'
                                            : 'text-zinc-500 hover:text-zinc-800'}
                                    `}
                                >
                                    {align.split('-')[1].toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </PropertyField>

                    <div className="grid grid-cols-2 gap-3">
                        <PropertyField label="Vertical Padding">
                            <select
                                value={(node.props?.className || "").match(/py-(0|2|4|6|8|12)/)?.[0] || ""}
                                onChange={(e) => {
                                    const current = node.props?.className || "";
                                    const filtered = current.replace(/py-(0|2|4|6|8|12)/g, "").trim();
                                    handleChange("className", `${filtered} ${e.target.value}`.trim());
                                }}
                                className="w-full text-xs border border-zinc-200 rounded p-1.5 bg-white"
                            >
                                <option value="py-0">None</option>
                                <option value="py-2">Small</option>
                                <option value="py-4">Medium</option>
                                <option value="py-8">Large</option>
                                <option value="py-12">X-Large</option>
                            </select>
                        </PropertyField>

                        <PropertyField label="Borders">
                            <select
                                value={(node.props?.className || "").match(/rounded-(none|md|lg|full)/)?.[0] || ""}
                                onChange={(e) => {
                                    const current = node.props?.className || "";
                                    const filtered = current.replace(/rounded-(none|md|lg|full)/g, "").trim();
                                    handleChange("className", `${filtered} ${e.target.value}`.trim());
                                }}
                                className="w-full text-xs border border-zinc-200 rounded p-1.5 bg-white"
                            >
                                <option value="rounded-none">Square</option>
                                <option value="rounded-md">Rounded</option>
                                <option value="rounded-lg">Soft</option>
                                <option value="rounded-full">Pill</option>
                            </select>
                        </PropertyField>
                    </div>

                    <PropertyField label="Background Color">
                        <div className="space-y-3">
                            <div className="flex gap-1.5 flex-wrap">
                                {[
                                    { name: 'None', class: '' },
                                    { name: 'White', class: 'bg-white border-zinc-200' },
                                    { name: 'Gray', class: 'bg-zinc-50 border-zinc-100' },
                                    { name: 'Zinc 100', class: 'bg-zinc-100 border-zinc-200' },
                                    { name: 'Blue', class: 'bg-blue-50 border-blue-100' },
                                    { name: 'Indigo 100', class: 'bg-indigo-50 border-indigo-100' },
                                    { name: 'Emerald', class: 'bg-emerald-50 border-emerald-100' },
                                    { name: 'Amber', class: 'bg-amber-50 border-amber-100' },
                                    { name: 'Rose', class: 'bg-rose-50 border-rose-100' },
                                    { name: 'Slate 200', class: 'bg-slate-200 border-slate-300' }
                                ].map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => {
                                            const current = node.props?.className || "";
                                            // Improved regex to catch more background classes
                                            const filtered = current
                                                .replace(/bg-(white|zinc-\w+|blue-\w+|emerald-\w+|amber-\w+|rose-\w+|slate-\w+|indigo-\w+)/g, "")
                                                .replace(/border-(zinc-\w+|blue-\w+|emerald-\w+|amber-\w+|rose-\w+|slate-\w+|indigo-\w+)/g, "")
                                                .trim();
                                            handleChange("className", `${filtered} ${c.class}`.trim());
                                        }}
                                        className={`w-6 h-6 rounded-md border transition-all hover:scale-110 active:scale-90
                                            ${(node.props?.className || "").includes(c.class.split(' ')[0]) && c.class !== '' ? 'ring-2 ring-blue-500 ring-offset-1 shadow-sm' : ''}
                                            ${c.class || 'bg-zinc-200 bg-[conic-gradient(#eee_25%,#fff_0_50%,#eee_0_75%,#fff_0)] bg-[length:4px_4px]'}
                                        `}
                                        title={c.name}
                                    />
                                ))}
                            </div>

                            {/* Color Code Display */}
                            <div className="flex items-center gap-2 bg-zinc-50 p-2 rounded border border-zinc-100 group">
                                <span className="text-[10px] font-mono text-zinc-500 flex-1 truncate">
                                    {(node.props?.className || "").match(/bg-[^\s]*/)?.[0] || "No Background"}
                                </span>
                                <button
                                    onClick={() => {
                                        const code = (node.props?.className || "").match(/bg-[^\s]*/)?.[0] || "";
                                        if (code) navigator.clipboard.writeText(code);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-200 rounded"
                                    title="Copy Class"
                                >
                                    <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                                </button>
                            </div>
                        </div>
                    </PropertyField>

                    <PropertyField label="Width">
                        <div className="flex bg-zinc-100 p-1 rounded-lg">
                            {[
                                { label: 'Auto', val: 'w-auto' },
                                { label: 'Full', val: 'w-full' }
                            ].map((w) => (
                                <button
                                    key={w.val}
                                    onClick={() => {
                                        const current = node.props?.className || "";
                                        const filtered = current.replace(/w-(auto|full)/g, "").trim();
                                        handleChange("className", `${filtered} ${w.val}`.trim());
                                    }}
                                    className={`flex-1 py-1 rounded-md text-[10px] font-bold
                                        ${(node.props?.className || "").includes(w.val)
                                            ? 'bg-white shadow-sm text-blue-600'
                                            : 'text-zinc-500'}
                                    `}
                                >
                                    {w.label}
                                </button>
                            ))}
                        </div>
                    </PropertyField>

                    <PropertyField label="Shadow">
                        <select
                            value={(node.props?.className || "").match(/shadow-(sm|md|lg|xl)/)?.[0] || ""}
                            onChange={(e) => {
                                const current = node.props?.className || "";
                                const filtered = current.replace(/shadow-(sm|md|lg|xl|none)/g, "").trim();
                                handleChange("className", `${filtered} ${e.target.value}`.trim());
                            }}
                            className="w-full text-xs border border-zinc-200 rounded p-1.5 bg-white"
                        >
                            <option value="">No Shadow</option>
                            <option value="shadow-sm">Small Shadow</option>
                            <option value="shadow-md">Medium Shadow</option>
                            <option value="shadow-lg">Large Depth</option>
                            <option value="shadow-xl">Extra Depth</option>
                        </select>
                    </PropertyField>

                    <details className="mt-4 group">
                        <summary className="text-[10px] font-bold text-zinc-400 uppercase cursor-pointer hover:text-zinc-600 tracking-widest flex items-center justify-between">
                            Advanced Classes
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">✎ EDIT</span>
                        </summary>
                        <div className="pt-2 relative group/adv">
                            <input
                                type="text"
                                value={node.props?.className || ""}
                                onChange={(e) => handleChange("className", e.target.value)}
                                placeholder="e.g. rounded-full px-4 mt-8"
                                className="w-full text-xs font-mono border border-zinc-200 rounded p-2 pr-8 focus:ring-1 ring-blue-500 outline-none bg-zinc-50"
                            />
                            <button
                                onClick={() => node.props?.className && navigator.clipboard.writeText(node.props.className)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/adv:opacity-100 transition-opacity p-1 hover:bg-zinc-200 rounded"
                                title="Copy All Classes"
                            >
                                <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                            </button>
                        </div>
                    </details>
                </div>

            </div>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50 mt-auto flex items-center justify-between">
                <div className="text-[10px] text-zinc-400 font-medium">
                    {justSaved ? "✅ Changes Applied" : isSaving ? "Saving..." : "Component Ready"}
                </div>
                <button
                    onClick={handleLocalSave}
                    disabled={isSaving}
                    className={`px-3 py-1 text-white text-[10px] font-bold rounded shadow-sm transition-all
                    ${isSaving ? 'bg-zinc-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}
                  `}
                >
                    {isSaving ? 'UPDATING...' : 'SAVE CHANGES'}
                </button>
            </div>
        </div>
    );
}

function PropertyField({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-600 block">{label}</label>
            {children}
        </div>
    );
}
