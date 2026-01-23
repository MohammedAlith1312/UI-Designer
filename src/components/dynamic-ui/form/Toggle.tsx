import React from 'react';

interface ToggleProps {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    label,
    checked = false,
    onChange,
    size = 'md',
    disabled = false,
    className
}) => {
    const sizes = {
        sm: { switch: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
        md: { switch: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
        lg: { switch: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' }
    };

    const sizeConfig = sizes[size];

    return (
        <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}>
            {label && <span className="text-sm font-medium text-zinc-700">{label}</span>}

            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange?.(e.target.checked)}
                    disabled={disabled}
                    className="sr-only peer"
                />
                <div className={`
                    ${sizeConfig.switch} rounded-full transition-colors
                    ${checked ? 'bg-blue-600' : 'bg-zinc-200'}
                    peer-focus:ring-2 peer-focus:ring-blue-500/20
                `}>
                    <div className={`
                        ${sizeConfig.thumb} bg-white rounded-full shadow-sm
                        transition-transform duration-200 ease-in-out
                        ${checked ? sizeConfig.translate : 'translate-x-0.5'}
                        mt-0.5
                    `} />
                </div>
            </div>
        </label>
    );
};
