"use client";

import React, { useState, useEffect } from "react";
import { useEditor } from "@/lib/builder-context";
import { useDraggable } from "@dnd-kit/core";
import { HERO_TEMPLATE, FEATURE_TEMPLATE, CTA_TEMPLATE, FOOTER_TEMPLATE } from '@/lib/templates';

type Tab = 'pages' | 'components' | 'settings';

export default function BuilderSidebar() {
    const [activeTab, setActiveTab] = useState<Tab>('components');

    return (
        <div className="w-80 bg-surface border-r border-border h-screen flex flex-col shrink-0 font-sans z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Header / Tabs */}
            <div className="flex items-center p-2 gap-1 border-b border-border bg-white/50 backdrop-blur-sm">
                <SidebarTab
                    label="Components"
                    isActive={activeTab === 'components'}
                    onClick={() => setActiveTab('components')}
                />
                <SidebarTab
                    label="Pages"
                    isActive={activeTab === 'pages'}
                    onClick={() => setActiveTab('pages')}
                />
                <SidebarTab
                    label="Config"
                    isActive={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50">
                {activeTab === 'pages' && <PagesPanel />}
                {activeTab === 'components' && <ComponentsPanel />}
                {activeTab === 'settings' && <SettingsPanel />}
            </div>
        </div>
    );
}

function SidebarTab({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all duration-200
                ${isActive
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-200'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}
            `}
        >
            {label}
        </button>
    );
}

// ----------------------------------------------------------------------
// PANEL: PAGES
// ----------------------------------------------------------------------
function PagesPanel() {
    const { schema, setSchema } = useEditor();
    const [pages, setPages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadPages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/dynamic-component");
            if (res.ok) {
                const data = await res.json();
                const pageList = data.filter((item: any) => item.category === 'page');
                setPages(pageList);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { loadPages(); }, []);

    const handleLoadPage = (page: any) => {
        const loadedSchema = page.schema;
        loadedSchema.title = page.name;
        setSchema(loadedSchema);
    };

    const handleCreateNew = () => {
        // Directly create empty page without confirmation
        setSchema({
            screenId: "new-page-" + Date.now(),
            title: "New Page",
            root: {
                id: "root",
                type: "container",
                props: { className: "min-h-screen bg-white" },
                children: []
            }
        });
    };

    const handleDeletePage = async (e: React.MouseEvent, pageId: string) => {
        e.stopPropagation(); // Prevent loading the page
        if (!confirm("Delete this page? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/dynamic-component?id=${pageId}`, { method: 'DELETE' });
            if (res.ok) {
                loadPages(); // Refresh list
            } else {
                alert("Failed to delete page");
            }
        } catch (e) {
            console.error(e);
            alert("Error deleting page");
        }
    };

    return (
        <div className="p-4 space-y-4">
            <button
                onClick={handleCreateNew}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white text-xs font-bold rounded-lg shadow-md shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                <span className="text-lg leading-none">+</span> Create New Page
            </button>

            <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Pages</h3>
                    <button onClick={loadPages} className="text-slate-400 hover:text-indigo-500 transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                </div>

                {isLoading && <div className="h-1 w-full bg-indigo-100 overflow-hidden rounded"><div className="h-full bg-indigo-500 w-1/3 animate-[shimmer_1s_infinite]"></div></div>}

                {!isLoading && pages.length === 0 && <p className="text-center text-xs text-slate-400 py-6 italic">No pages found.</p>}

                {pages.map((page) => (
                    <div
                        key={page.id}
                        className={`group p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all relative
                            ${schema.title === page.name ? 'ring-2 ring-indigo-500 border-transparent shadow-indigo-100' : ''}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                onClick={() => handleLoadPage(page)}
                                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-colors
                                    ${schema.title === page.name ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}
                                `}>
                                    📄
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className={`text-sm font-bold truncate ${schema.title === page.name ? 'text-indigo-900' : 'text-slate-700'}`}>{page.name}</h4>
                                    <p className="text-[10px] text-slate-400 truncate">Modified {new Date(page.updated_at || page.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleLoadPage(page)}
                                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                                    title="Edit Page"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => handleDeletePage(e, page.id)}
                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                    title="Delete Page"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// PANEL: COMPONENTS
// ----------------------------------------------------------------------
function ComponentsPanel() {
    const { addComponent, selectedId } = useEditor();

    const getTargetId = () => selectedId || "root-container";

    const addItem = (type: string) => addComponent(getTargetId(), type);

    return (
        <div className="p-4 space-y-8 pb-20">
            <PaletteSection title="Layout & Structure">
                <PaletteItem label="Container" type="container" onClick={() => addItem('container')} icon="📦" />
                <PaletteItem label="Grid System" type="grid" onClick={() => addItem('grid')} icon="▦" />
                <PaletteItem label="Flex Container" type="stack" onClick={() => addItem('stack')} icon="☰" />
                <PaletteItem label="Tabs" type="tabs" onClick={() => addItem('tabs')} icon="📑" />
                <PaletteItem label="Accordion" type="accordion" onClick={() => addItem('accordion')} icon="↕️" />
            </PaletteSection>

            <PaletteSection title="Pre-Built Sections">
                <PaletteItem label="Navigation Bar" type="navbar" onClick={() => addItem('navbar')} icon="🧭" fullWidth />
                <PaletteItem label="Hero Section" type="hero-section" onClick={() => addItem(HERO_TEMPLATE() as any)} icon="⭐" fullWidth />
                <PaletteItem label="Features Grid" type="feature-section" onClick={() => addItem(FEATURE_TEMPLATE() as any)} icon="✨" fullWidth />
                <PaletteItem label="Footer" type="footer-section" onClick={() => addItem(FOOTER_TEMPLATE() as any)} icon="⚓" fullWidth />
                <PaletteItem label="Call to Action" type="cta-section" onClick={() => addItem(CTA_TEMPLATE() as any)} icon="📣" fullWidth />
            </PaletteSection>

            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Elements</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <PaletteItem label="Heading" type="heading" onClick={() => addItem('heading')} icon="H1" />
                        <PaletteItem label="Text" type="text" onClick={() => addItem('text')} icon="Aa" />
                        <PaletteItem label="Button" type="button" onClick={() => addItem('button')} icon="Btn" />
                        <PaletteItem label="Image" type="image" onClick={() => addItem('image')} icon="Img" />
                        <PaletteItem label="Card" type="card" onClick={() => addItem('card')} icon="□" />
                        <PaletteItem label="Badge" type="badge" onClick={() => addItem('badge')} icon="🏷️" />
                    </div>
                </div>

                <div className="col-span-2 space-y-2">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Forms</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <PaletteItem label="Form Block" type="form" onClick={() => addItem('form')} icon="📋" />
                        <PaletteItem label="Input" type="input" onClick={() => addItem('input')} icon="I" />
                        <PaletteItem label="Textarea" type="textarea" onClick={() => addItem('textarea')} icon="¶" />
                        <PaletteItem label="Dropdown" type="select" onClick={() => addItem('select')} icon="▼" />
                        <PaletteItem label="Radio" type="radio" onClick={() => addItem('radio')} icon="⚪" />
                        <PaletteItem label="Checkbox" type="checkbox" onClick={() => addItem('checkbox')} icon="☑" />
                        <PaletteItem label="Button" type="button" onClick={() => addItem('button')} icon="Btn" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaletteSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{title}</h3>
            <div className="grid grid-cols-2 gap-2">
                {children}
            </div>
        </div>
    );
}

// Updated PaletteItem with Draggable
function PaletteItem({ label, type, onClick, icon, fullWidth }: { label: string, type: string, onClick: () => void, icon: string, fullWidth?: boolean }) {
    // START: Hydration Fix
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    const draggable = useDraggable({
        id: `palette-${type}`,
        data: { type, label, icon },
        disabled: !isMounted // Disable drag logic during SSR
    });

    const { attributes, listeners, setNodeRef, isDragging } = draggable;

    // We only attach dnd listeners if mounted to prevent ID mismatches
    const dndProps = isMounted ? { ...listeners, ...attributes } : {};
    // END: Hydration Fix

    return (
        <button
            ref={setNodeRef}
            {...dndProps}
            onClick={onClick}
            className={`group flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-lg text-left transition-all duration-200
                hover:border-indigo-400 hover:shadow-[0_2px_8px_rgba(99,102,241,0.15)] hover:-translate-y-0.5
                ${fullWidth ? 'col-span-2' : ''}
                ${isDragging ? 'opacity-50 ring-2 ring-indigo-500' : ''}
            `}
        >
            <div className="w-8 h-8 shrink-0 rounded-md bg-slate-50 text-slate-400 flex items-center justify-center text-xs font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {icon}
            </div>
            <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900">{label}</span>
        </button>
    );
}

// ----------------------------------------------------------------------
// PANEL: SETTINGS
// ----------------------------------------------------------------------
function SettingsPanel() {
    const { schema, setSchema } = useEditor();

    const handleChange = (key: string, value: any) => {
        setSchema({ ...schema, [key]: value });
    };

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase">Page Configuration</h3>

                <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase">Page Title</label>
                    <input
                        type="text"
                        value={schema.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="w-full text-sm p-2.5 border border-slate-200 rounded-lg bg-white focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-500 font-bold uppercase">Route (Slug)</label>
                    <div className="flex items-center">
                        <span className="bg-slate-100 text-slate-500 text-xs px-2 py-2.5 rounded-l-lg border-y border-l border-slate-200">/</span>
                        <input
                            type="text"
                            value={schema.screenId || ""}
                            onChange={(e) => handleChange("screenId", e.target.value)}
                            className="w-full text-sm p-2.5 border border-slate-200 rounded-r-lg bg-white focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono text-slate-600"
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 text-indigo-800 text-xs leading-relaxed shadow-sm">
                <h4 className="font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Custom Theme
                </h4>
                Global theme settings and custom CSS injection will be available here soon!
            </div>
        </div>
    );
}
