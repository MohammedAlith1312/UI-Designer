import React from 'react';

export const TableHead: React.FC<any> = ({ children, className }) => (
    <thead className={`bg-zinc-50 text-zinc-500 font-medium uppercase text-[10px] border-b border-zinc-200 ${className || ''}`}>
        <tr>{children}</tr>
    </thead>
);

export const TableRow: React.FC<any> = ({ children, className }) => (
    <tr className={`border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors ${className || ''}`}>
        {children}
    </tr>
);

export const TableCell: React.FC<any> = ({ children, isHeader, className }) => {
    const Tag = isHeader ? 'th' : 'td';
    return (
        <Tag className={`px-4 py-3 text-zinc-700 font-medium ${isHeader ? 'font-bold text-zinc-500' : 'font-normal'} ${className || ''}`}>
            {children}
        </Tag>
    );
};
