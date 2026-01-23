import React from "react";
import { ComponentSchema } from "../../types/schema";

interface PropertyEditorProps {
    component: ComponentSchema | null;
    onChange: (updatedRequest: Partial<ComponentSchema['props']>) => void;
}

export default function PropertyEditor({ component, onChange }: PropertyEditorProps) {
    if (!component) {
        return (
            <div className="p-6 text-center text-zinc-400 text-sm">
                Select an element on the canvas to edit its properties.
            </div>
        );
    }

    const handleChange = (key: string, value: any) => {
        onChange({ [key]: value });
    };

    return (
        <div className="p-4 space-y-6">
            <div className="border-b border-zinc-100 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wide text-zinc-800">
                    {component.type} Settings
                </h3>
                <p className="text-xs text-zinc-400 mt-1">ID: {component.id || 'N/A'}</p>
            </div>

            {/* Common Fields */}
            <div className="space-y-4">

                {/* Text Content (if applicable) */}
                {(component.props?.text !== undefined || component.type === 'button' || component.type === 'heading') && (
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-1">Text / Label</label>
                        <input
                            type="text"
                            className="w-full text-sm border border-zinc-200 rounded p-2 focus:ring-2 ring-blue-500 outline-none"
                            value={component.props?.text || component.props?.label || component.props?.content || ''}
                            onChange={(e) => {
                                if (component.props?.label !== undefined) handleChange('label', e.target.value);
                                else if (component.props?.content !== undefined) handleChange('content', e.target.value);
                                else handleChange('text', e.target.value);
                            }}
                        />
                    </div>
                )}

                {/* Variant / Style */}
                {(component.type === 'button' || component.type === 'badge') && (
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-1">Variant</label>
                        <select
                            className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                            value={component.props?.variant || 'primary'}
                            onChange={(e) => handleChange('variant', e.target.value)}
                        >
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                            <option value="outline">Outline</option>
                            <option value="ghost">Ghost</option>
                            <option value="danger">Danger</option>
                        </select>
                    </div>
                )}

                {/* Container/Layout Props */}
                {(component.type === 'container' || component.type === 'card') && (
                    <>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1">Padding</label>
                            <select
                                className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                                value={component.props?.className?.match(/p-\d+/)?.[0] || 'p-4'}
                                onChange={(e) => {
                                    // Simple regex replacement for demo purposes (robust class handling would be better)
                                    const currentClass = component.props?.className || '';
                                    const newClass = currentClass.includes('p-')
                                        ? currentClass.replace(/p-\d+/, e.target.value)
                                        : `${currentClass} ${e.target.value}`.trim();
                                    handleChange('className', newClass);
                                }}
                            >
                                <option value="p-0">None</option>
                                <option value="p-2">Small (2)</option>
                                <option value="p-4">Medium (4)</option>
                                <option value="p-8">Large (8)</option>
                                <option value="p-12">Extra Large (12)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 mb-1">Background</label>
                            <select
                                className="w-full text-sm border border-zinc-200 rounded p-2 bg-white"
                                onChange={(e) => {
                                    const currentClass = component.props?.className || '';
                                    // Remove existing bg-
                                    let newClass = currentClass.replace(/bg-[\w-]+/g, '').trim();
                                    newClass = `${newClass} ${e.target.value}`.trim();
                                    handleChange('className', newClass);
                                }}
                            >
                                <option value="bg-white">White</option>
                                <option value="bg-zinc-50">Light Gray</option>
                                <option value="bg-blue-50">Light Blue</option>
                                <option value="bg-red-50">Light Red</option>
                                <option value="bg-black text-white">Black</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Grid Props */}
                {component.type === 'grid' && (
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 mb-1">Columns</label>
                        <input
                            type="number"
                            min="1" max="12"
                            className="w-full text-sm border border-zinc-200 rounded p-2"
                            value={component.props?.columns || 1}
                            onChange={(e) => handleChange('columns', parseInt(e.target.value))}
                        />
                    </div>
                )}

            </div>

            {/* Raw JSON Fallback for advanced edits */}
            <div className="pt-6 border-t border-zinc-100">
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-2">Dev Mode</p>
                <div className="bg-zinc-50 p-2 rounded text-xs font-mono text-zinc-500 break-all">
                    {JSON.stringify(component.props, null, 2)}
                </div>
            </div>
        </div>
    );
}
