import React from 'react';

interface SplitPaneProps {
    direction?: 'horizontal' | 'vertical';
    sizes?: [number, number];
    minSize?: [number, number];
    children?: React.ReactNode[];
    className?: string;
}

export const SplitPane: React.FC<SplitPaneProps> = ({
    direction = 'horizontal',
    sizes = [50, 50],
    minSize = [100, 100],
    children = [],
    className
}) => {
    const isHorizontal = direction === 'horizontal';

    return (
        <div className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} w-full h-full ${className || ''}`}>
            <div
                className="overflow-auto"
                style={{
                    [isHorizontal ? 'width' : 'height']: `${sizes[0]}%`,
                    [isHorizontal ? 'minWidth' : 'minHeight']: `${minSize[0]}px`
                }}
            >
                {children[0]}
            </div>

            <div className={`bg-zinc-200 hover:bg-blue-500 transition-colors cursor-${isHorizontal ? 'col' : 'row'}-resize`}
                style={{ [isHorizontal ? 'width' : 'height']: '4px' }}
            />

            <div
                className="overflow-auto flex-1"
                style={{
                    [isHorizontal ? 'minWidth' : 'minHeight']: `${minSize[1]}px`
                }}
            >
                {children[1]}
            </div>
        </div>
    );
};
