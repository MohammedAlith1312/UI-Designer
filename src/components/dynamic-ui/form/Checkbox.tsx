"use client";

import React from 'react';
import { useUIState } from '@/lib/dynamic-ui/context';

interface Option {
    label: string;
    value: string;
}

interface CheckboxProps {
    label?: string;
    name?: string;
    id?: string;
    options?: Option[];
    direction?: "row" | "column";
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, name, id, options = [], direction = "column" }) => {
    const { getValue, setValue } = useUIState();
    const stateKey = name || id || label?.toLowerCase().replace(/\s+/g, '_') || 'unnamed_checkbox';

    // For single checkbox, value is boolean. 
    // For group (options provided), value is an array of selected option values.
    const currentValue = getValue(stateKey);

    const isChecked = (val: string) => {
        if (Array.isArray(currentValue)) {
            return currentValue.includes(val);
        }
        return !!currentValue;
    };

    const handleChange = (optionValue?: string, isExplicitCheck?: boolean) => {
        if (options.length > 0 && optionValue) {
            // Group Mode: Toggle value in array
            const currentArray = Array.isArray(currentValue) ? currentValue : [];
            const newArray = isExplicitCheck
                ? [...currentArray, optionValue]
                : currentArray.filter(v => v !== optionValue);
            setValue(stateKey, newArray);
        } else {
            // Single Mode
            setValue(stateKey, isExplicitCheck);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="text-sm font-medium text-zinc-700 font-outfit">
                    {label}
                </label>
            )}

            <div className={`flex ${direction === "row" ? "flex-row flex-wrap gap-6" : "flex-col gap-2"}`}>
                {options.length > 0 ? (
                    options.map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer group w-fit">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={isChecked(option.value)}
                                    onChange={(e) => handleChange(option.value, e.target.checked)}
                                    className="peer h-4 w-4 appearance-none rounded border border-zinc-300 bg-white checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                                <svg
                                    className="pointer-events-none absolute inset-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors font-inter">
                                {option.label}
                            </span>
                        </label>
                    ))
                ) : (
                    // Single Checkbox Mode
                    <label className="flex items-center gap-2 cursor-pointer group w-fit">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={!!currentValue}
                                onChange={(e) => handleChange(undefined, e.target.checked)}
                                className="peer h-4 w-4 appearance-none rounded border border-zinc-300 bg-white checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            />
                            <svg
                                className="pointer-events-none absolute inset-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        {label && (
                            <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors font-inter">
                                {label} (Toggle)
                            </span>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
};
