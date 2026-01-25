"use client";

import React, { useState } from "react";
import DynamicRenderer from "@/app/components/DynamicRendered";
import { useEditor } from "@/lib/builder-context";

export default function BuilderCanvas() {
    const { schema, selectComponent, selectedId, viewMode, setViewMode } = useEditor();
    const [showGrid, setShowGrid] = useState(false);

    const widths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px'
    };

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-100 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white/50 pointer-events-none" />

            {/* Debug Grid Toggle Button (Floating) */}
            <div className="absolute top-6 right-6 z-30">
                <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-lg border border-white/50
                        ${showGrid ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 'bg-white text-slate-400 hover:text-indigo-600'}
                    `}
                    title="Toggle Debug Outlines"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
            </div>

            {/* Canvas Area */}
            <div
                className={`flex-1 overflow-y-auto overflow-x-hidden flex justify-center items-start cursor-default relative z-10
                    ${viewMode === 'desktop' ? 'p-0' : 'p-8 pt-24'}
                `}
                onClick={() => selectComponent(null)}
            >
                <div
                    className={`bg-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top
                        ${viewMode === 'desktop' ? 'w-full shadow-none border-0 h-full flex flex-col' : ''}
                        ${viewMode === 'tablet' ? 'rounded-lg shadow-2xl shadow-indigo-900/10 border border-white/60 my-auto min-h-[800px]' : ''}
                        ${viewMode === 'mobile' ? 'rounded-[3rem] p-2 border-[8px] border-slate-800 shadow-2xl my-auto min-h-[800px]' : ''}
                        ${showGrid ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-indigo-50' : ''}
                    `}
                    style={{ width: widths[viewMode] }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`w-full bg-white relative ${viewMode === 'mobile' ? 'rounded-[2.2rem] h-full overflow-hidden' : (viewMode === 'desktop' ? 'flex-1 overflow-y-auto' : 'rounded-lg h-full overflow-hidden')}`}>
                        <DynamicRenderer
                            schema={schema}
                            isEditor={true}
                            onSelect={(node) => selectComponent(node.id || null)}
                            selectedId={selectedId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ active, onClick, icon, label, viewMode }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, viewMode: string }) {
    return (
        <button
            onClick={onClick}
            className={`p-2 px-3 rounded-full flex items-center gap-2 transition-all text-[11px] font-bold tracking-wide
                ${active
                    ? 'bg-slate-900 text-white shadow-md transform scale-105'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
            `}
            title={label}
        >
            {icon}
            {viewMode === 'mobile' && !label.includes('Mobile') ? '' : <span>{label}</span>}
        </button>
    );
}
