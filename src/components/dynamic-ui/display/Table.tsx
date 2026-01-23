import React from 'react';

interface Column {
    key: string;
    header: string;
    width?: string;
}

export const Table: React.FC<any> = ({ columns = [], data = [], children, className }: any) => {
    // If children are provided, we treat this as a layout table for the Visual Builder
    if (children) {
        return (
            <div className={`w-full overflow-hidden border border-zinc-200 rounded-lg shadow-sm bg-white ${className || ''}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        {children}
                    </table>
                </div>
            </div>
        );
    }

    // Default Data-bound Table behavior
    return (
        <div className={`w-full overflow-hidden border border-zinc-200 rounded-lg shadow-sm bg-white ${className || ''}`}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 text-zinc-500 font-medium uppercase text-xs">
                        <tr>
                            {columns.map((col: Column) => (
                                <th
                                    key={col.key}
                                    className="px-6 py-3 border-b border-zinc-200 whitespace-nowrap"
                                    style={{ width: col.width || 'auto' }}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-8 text-center text-zinc-400">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row: any, rowIndex: number) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className="bg-white hover:bg-zinc-50 transition-colors"
                                >
                                    {columns.map((col: Column) => (
                                        <td key={`${rowIndex}-${col.key}`} className="px-6 py-4 text-zinc-700">
                                            {typeof row[col.key] === 'object' && row[col.key] !== null ? (
                                                <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded text-zinc-600 block max-w-[200px] truncate">
                                                    {JSON.stringify(row[col.key])}
                                                </code>
                                            ) : (
                                                row[col.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
