import React from 'react';

export const Form: React.FC<any> = ({ children, className, onSubmit, style }) => (
    <form
        onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}
        className={`space-y-4 p-6 border border-zinc-200 rounded-xl bg-white shadow-sm ${className || ''}`}
        style={style}
    >
        {children}
    </form>
);

export const FormGroup: React.FC<any> = ({ label, children, className, style }) => (
    <div className={`space-y-1.5 ${className || ''}`} style={style}>
        {label && <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">{label}</label>}
        {children}
    </div>
);
