import React from 'react';

interface TextareaProps {
    label?: string;
    placeholder?: string;
    name?: string;
    rows?: number;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
    placeholder,
    name,
    rows = 4,
    value,
    onChange,
    className
}) => {
    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && (
                <label className="text-sm font-medium text-zinc-700 font-outfit">
                    {label}
                </label>
            )}
            <textarea
                name={name}
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-inter text-sm resize-none"
            />
        </div>
    );
};
