"use client";

import React from 'react';
import { useUIState } from '@/lib/dynamic-ui/context';

interface SelectOption {
    label: string;
    value: string | number;
}

interface SelectProps {
    label?: string;
    name?: string;
    id?: string;
    options: SelectOption[];
    defaultValue?: string | number;
}

export const Select: React.FC<SelectProps> = ({ label, name, id, options = [], defaultValue }) => {
    const { getValue, setValue } = useUIState();
    const stateKey = name || id || label?.toLowerCase().replace(/\s+/g, '_') || 'unnamed_select';

    const value = getValue(stateKey) ?? defaultValue ?? '';

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 font-outfit">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => setValue(stateKey, e.target.value)}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white font-inter text-sm"
            >
                <option value="" disabled>Select an option...</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
