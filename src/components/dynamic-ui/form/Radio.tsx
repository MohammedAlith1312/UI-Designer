"use client";

import React from 'react';
import { useUIState } from '@/lib/dynamic-ui/context';

interface Option {
    label: string;
    value: string;
}

interface RadioProps {
    label?: string;
    name?: string;
    id?: string;
    options?: Option[];
    defaultValue?: string;
    direction?: "row" | "column";
}

export const Radio: React.FC<RadioProps> = ({ label, name, id, options = [], direction = "column" }) => {
    const { getValue, setValue } = useUIState();
    const stateKey = name || id || label?.toLowerCase().replace(/\s+/g, '_') || 'unnamed_radio';
    const currentValue = getValue(stateKey);

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 font-outfit">
                    {label}
                </label>
            )}
            <div className={`flex ${direction === "row" ? "flex-row gap-6" : "flex-col gap-2"}`}>
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                type="radio"
                                name={stateKey}
                                value={option.value}
                                checked={currentValue === option.value}
                                onChange={() => setValue(stateKey, option.value)}
                                className="peer h-4 w-4 appearance-none rounded-full border border-zinc-300 bg-white checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors font-inter">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
            {/* Fallback if no options provided */}
            {options.length === 0 && (
                <div className="p-3 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-200">
                    Warning: Radio group "{label}" has no options defined.
                </div>
            )}
        </div>
    );
};
