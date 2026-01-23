import React from 'react';

interface ProgressProps {
    value?: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'error';
    animated?: boolean;
    className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
    value = 0,
    max = 100,
    label,
    showValue = true,
    size = 'md',
    variant = 'default',
    animated = false,
    className
}) => {
    const percentage = Math.min((value / max) * 100, 100);

    const heights = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    };

    const colors = {
        default: 'bg-blue-600',
        success: 'bg-emerald-600',
        warning: 'bg-amber-600',
        error: 'bg-red-600'
    };

    return (
        <div className={`space-y-2 ${className || ''}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-center">
                    {label && <span className="text-sm font-medium text-zinc-700">{label}</span>}
                    {showValue && <span className="text-sm font-mono text-zinc-500">{Math.round(percentage)}%</span>}
                </div>
            )}

            <div className={`w-full bg-zinc-200 rounded-full overflow-hidden ${heights[size]}`}>
                <div
                    className={`
                        ${heights[size]} ${colors[variant]} rounded-full transition-all duration-300
                        ${animated ? 'animate-pulse' : ''}
                    `}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
