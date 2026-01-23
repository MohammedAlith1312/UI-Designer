"use client";

import React from 'react';
import { useUIState } from '@/lib/dynamic-ui/context';

interface InputProps {
    label?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    id?: string;
}

export const Input: React.FC<InputProps> = ({ label, placeholder, type = "text", name, id }) => {
    const { getValue, setValue } = useUIState();
    const stateKey = name || id || label?.toLowerCase().replace(/\s+/g, '_') || 'unnamed_field';
    const value = getValue(stateKey) || '';

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 font-outfit">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(stateKey, e.target.value)}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-inter text-sm"
            />
        </div>
    );
};
