import React from 'react';

export const List: React.FC<any> = ({ items = [], ordered = false, className }: any) => {
    const Tag = ordered ? 'ol' : 'ul';
    const listStyle = ordered ? 'list-decimal ml-5' : 'list-disc ml-5';

    return (
        <Tag className={`${listStyle} space-y-1 text-zinc-700 ${className || ''}`}>
            {items.length > 0 ? (
                items.map((item: any, idx: number) => (
                    <li key={idx}>
                        {typeof item === 'string' ? item : JSON.stringify(item)}
                    </li>
                ))
            ) : (
                <li className="text-zinc-400 italic">Empty List</li>
            )}
        </Tag>
    );
};
