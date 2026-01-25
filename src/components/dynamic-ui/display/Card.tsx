import React from 'react';

export const Card: React.FC<any> = ({ children, title, className, style }: any) => (
    <div className={`p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${className || ''}`} style={style}>
        {title && (
            <h3 className="text-lg font-bold mb-4 text-zinc-900">
                {title}
            </h3>
        )}
        {children}
    </div>
);
