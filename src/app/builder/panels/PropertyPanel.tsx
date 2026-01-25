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

    const handleClearStyleProperty = (propertyName: string) => {
        if (!node) return;
        const currentStyle = { ...(node.props?.style || {}) };
        delete currentStyle[propertyName];
        const newProps = { ...node.props, style: currentStyle };
        updateComponentProps(node.id!, newProps);
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

                {/* Content Configuration */}
                {(['text', 'heading', 'button', 'link', 'badge', 'label', 'image'].includes(node.type)) && (
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Content</label>

                        {/* Text Content */}
                        {(node.type === 'text' || node.type === 'heading' || node.type === 'badge' || node.type === 'label') && (
                            <PropertyField label="Text Content">
                                <input
                                    type="text"
                                    value={node.props?.text || node.props?.children || ""}
                                    onChange={(e) => {
                                        // Update both text and children in one go to prevent state overwrite issues
                                        const val = e.target.value;
                                        updateComponentProps(node.id!, {
                                            ...node.props,
                                            text: val,
                                            children: val
                                        });
                                    }}
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none"
                                />
                            </PropertyField>
                        )}

                        {/* Button/Link Content */}
                        {(node.type === 'button' || node.type === 'link') && (
                            <PropertyField label="Label">
                                <input
                                    type="text"
                                    value={node.props?.children || node.props?.text || node.props?.label || ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        updateComponentProps(node.id!, {
                                            ...node.props,
                                            children: val,
                                            text: val,
                                            label: val
                                        });
                                    }}
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none"
                                />
                            </PropertyField>
                        )}

                        {/* Image Source */}
                        {node.type === 'image' && (
                            <PropertyField label="Image URL">
                                <input
                                    type="text"
                                    value={node.props?.src || ""}
                                    onChange={(e) => handleChange("src", e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-1 ring-blue-500 outline-none"
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
                                <option value={5}>Heading 5</option>
                                <option value={6}>Heading 6</option>
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
                                <option value="custom">Custom / None</option>
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

                    {(node.type === 'input' || node.type === 'textarea' || node.type === 'select') && (
                        <>
                            <PropertyField label="Label Text">
                                <input
                                    type="text"
                                    value={node.props?.label || ""}
                                    onChange={(e) => handleChange("label", e.target.value)}
                                    placeholder="Enter label text"
                                    className="w-full text-sm border border-zinc-200 rounded p-2"
                                />
                            </PropertyField>
                            <PropertyField label="Placeholder">
                                <input
                                    type="text"
                                    value={node.props?.placeholder || ""}
                                    onChange={(e) => handleChange("placeholder", e.target.value)}
                                    placeholder="Enter placeholder text"
                                    className="w-full text-sm border border-zinc-200 rounded p-2"
                                />
                            </PropertyField>
                        </>
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
                        <PropertyField label="Grid Layout Builder">
                            <div className="space-y-3">
                                {/* Visual Grid Configurator */}
                                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                                    <div className="space-y-1">
                                        {Array.from({ length: 12 }, (_, rowIndex) => {
                                            const currentRowCols = node.props?.rowStructure?.[rowIndex] || 0;
                                            const isRowActive = currentRowCols > 0;

                                            return (
                                                <div key={rowIndex} className="flex items-center gap-1">
                                                    {/* Row label */}
                                                    <div className={`w-6 text-[9px] font-bold text-center ${isRowActive ? 'text-blue-600' : 'text-zinc-300'}`}>
                                                        R{rowIndex + 1}
                                                    </div>

                                                    {/* Column cells for this row */}
                                                    <div className="flex gap-0.5 flex-1">
                                                        {Array.from({ length: 12 }, (_, colIndex) => {
                                                            const isActive = colIndex < currentRowCols;

                                                            return (
                                                                <button
                                                                    key={colIndex}
                                                                    onClick={() => {
                                                                        const newRowStructure = { ...(node.props?.rowStructure || {}) };
                                                                        if (colIndex === 0) {
                                                                            // Clicking first cell toggles row on/off
                                                                            newRowStructure[rowIndex] = currentRowCols > 0 ? 0 : 1;
                                                                        } else {
                                                                            // Clicking other cells sets column count
                                                                            newRowStructure[rowIndex] = colIndex + 1;
                                                                        }
                                                                        handleChange("rowStructure", newRowStructure);
                                                                    }}
                                                                    className={`h-4 flex-1 rounded-sm transition-all ${isActive
                                                                        ? 'bg-blue-500 hover:bg-blue-600 shadow-sm'
                                                                        : 'bg-zinc-200 hover:bg-zinc-300'
                                                                        }`}
                                                                    title={`Row ${rowIndex + 1}, Col ${colIndex + 1}`}
                                                                />
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Column count display */}
                                                    {isRowActive && (
                                                        <div className="w-8 text-[9px] font-mono text-blue-600 text-right font-bold">
                                                            ×{currentRowCols}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                                    <div className="text-[9px] font-bold text-blue-700 uppercase mb-1">Grid Structure</div>
                                    <div className="space-y-0.5">
                                        {Object.entries(node.props?.rowStructure || {}).map(([rowIdx, cols]: [string, any]) => {
                                            if (cols > 0) {
                                                return (
                                                    <div key={rowIdx} className="text-[10px] text-blue-600 font-mono flex justify-between">
                                                        <span>Row {parseInt(rowIdx) + 1}:</span>
                                                        <span className="font-bold">{cols} columns</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                        {Object.values(node.props?.rowStructure || {}).every((v: any) => v === 0 || !v) && (
                                            <div className="text-[10px] text-zinc-400 italic text-center">
                                                Click cells to build your grid
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleChange("rowStructure", {})}
                                        className="flex-1 py-1.5 text-[9px] font-bold text-zinc-500 hover:text-red-600 bg-white hover:bg-red-50 border border-zinc-200 hover:border-red-300 rounded transition-all"
                                    >
                                        CLEAR ALL
                                    </button>
                                    <button
                                        onClick={() => {
                                            const uniform: Record<number, number> = {};
                                            for (let i = 0; i < 3; i++) {
                                                uniform[i] = 3;
                                            }
                                            handleChange("rowStructure", uniform);
                                        }}
                                        className="flex-1 py-1.5 text-[9px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all"
                                    >
                                        3×3 PRESET
                                    </button>
                                </div>
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

                    <PropertyField label="Custom Colors">
                        <div className="space-y-3">
                            {/* Background Color */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Background</label>
                                    {node.props?.style?.backgroundColor && (
                                        <button
                                            onClick={() => handleClearStyleProperty('backgroundColor')}
                                            className="text-[9px] text-red-500 hover:text-red-700 font-bold"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <div className={`flex items-center gap-2 p-2 border-2 rounded-lg bg-white transition-all ${node.props?.style?.backgroundColor
                                    ? 'border-blue-500 shadow-sm shadow-blue-500/20'
                                    : 'border-zinc-200 hover:border-zinc-300'
                                    }`}>
                                    <input
                                        type="color"
                                        value={node.props?.style?.backgroundColor || "#ffffff"}
                                        onChange={(e) => {
                                            const newStyle = { ...(node.props?.style || {}), backgroundColor: e.target.value };
                                            handleChange("style", newStyle);

                                            // Remove conflicting background classes
                                            const current = node.props?.className || "";
                                            const filtered = current
                                                .replace(/bg-(white|transparent|zinc-\w+|blue-\w+|emerald-\w+|amber-\w+|rose-\w+|slate-\w+|indigo-\w+)/g, "")
                                                .replace(/bg-gradient-to-\w+/g, "")
                                                .replace(/from-\w+-\d+/g, "")
                                                .replace(/to-\w+-\d+/g, "")
                                                .trim();
                                            if (filtered !== current) {
                                                handleChange("className", filtered);
                                            }
                                        }}
                                        className="w-10 h-10 rounded-md border-0 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className={`text-xs font-mono ${node.props?.style?.backgroundColor ? 'text-blue-600 font-bold' : 'text-zinc-400'
                                            }`}>
                                            {node.props?.style?.backgroundColor || 'Not set'}
                                        </div>
                                    </div>
                                    {node.props?.style?.backgroundColor && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-blue-600">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[9px] font-bold">ACTIVE</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Text Color */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Text Color</label>
                                    {node.props?.style?.color && (
                                        <button
                                            onClick={() => handleClearStyleProperty('color')}
                                            className="text-[9px] text-red-500 hover:text-red-700 font-bold"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <div className={`flex items-center gap-2 p-2 border-2 rounded-lg bg-white transition-all ${node.props?.style?.color
                                    ? 'border-blue-500 shadow-sm shadow-blue-500/20'
                                    : 'border-zinc-200 hover:border-zinc-300'
                                    }`}>
                                    <input
                                        type="color"
                                        value={node.props?.style?.color || "#000000"}
                                        onChange={(e) => {
                                            const newStyle = { ...(node.props?.style || {}), color: e.target.value };
                                            handleChange("style", newStyle);

                                            // Remove conflicting text color classes
                                            const current = node.props?.className || "";
                                            const filtered = current
                                                .replace(/text-(zinc-\w+|white|black|blue-\w+|red-\w+|green-\w+|yellow-\w+)/g, "")
                                                .trim();
                                            if (filtered !== current) {
                                                handleChange("className", filtered);
                                            }
                                        }}
                                        className="w-10 h-10 rounded-md border-0 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className={`text-xs font-mono ${node.props?.style?.color ? 'text-blue-600 font-bold' : 'text-zinc-400'
                                            }`}>
                                            {node.props?.style?.color || 'Not set'}
                                        </div>
                                    </div>
                                    {node.props?.style?.color && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded text-blue-600">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[9px] font-bold">ACTIVE</span>
                                        </div>
                                    )}
                                </div>
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
