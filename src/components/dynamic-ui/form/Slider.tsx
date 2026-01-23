import React from 'react';

interface SliderProps {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
    showValue?: boolean;
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    min = 0,
    max = 100,
    step = 1,
    value = 50,
    onChange,
    showValue = true,
    className
}) => {
    return (
        <div className={`space-y-2 ${className || ''}`}>
            {label && (
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-700">{label}</label>
                    {showValue && (
                        <span className="text-sm font-mono text-zinc-500">{value}</span>
                    )}
                </div>
            )}

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange?.(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
            />

            <div className="flex justify-between text-xs text-zinc-400">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};
