import React from 'react';

export const Placeholder = ({
    type,
    props,
}: {
    type: string;
    props?: any;
}) => (
    <div className="p-4 border-2 border-dashed border-zinc-300 rounded-lg bg-zinc-50 flex flex-col gap-2">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            Component: {type}
        </span>
        {props?.label && <span className="font-medium">{props.label}</span>}
        {props?.text && <p className="text-sm text-zinc-600">{props.text}</p>}
    </div>
);
