import React from 'react';

interface ScrollAreaProps {
    height?: string;
    maxHeight?: string;
    scrollbar?: 'auto' | 'custom' | 'hidden';
    children?: React.ReactNode;
    className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({
    height,
    maxHeight = '400px',
    scrollbar = 'auto',
    children,
    className
}) => {
    const scrollbarClass = {
        auto: 'overflow-auto',
        custom: 'overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-zinc-100',
        hidden: 'overflow-auto scrollbar-hide'
    }[scrollbar];

    return (
        <div
            className={`${scrollbarClass} ${className || ''}`}
            style={{
                height: height || 'auto',
                maxHeight: maxHeight
            }}
        >
            {children}
        </div>
    );
};
