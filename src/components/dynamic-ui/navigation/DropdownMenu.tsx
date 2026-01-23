import React, { useState } from 'react';

interface DropdownMenuProps {
    trigger?: React.ReactNode;
    triggerText?: string;
    items?: Array<{
        label: string;
        icon?: string;
        href?: string;
        onClick?: () => void;
        divider?: boolean;
    }>;
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    trigger,
    triggerText = 'Menu',
    items = [],
    position = 'bottom-left',
    className
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const positionClasses = {
        'bottom-left': 'top-full left-0 mt-2',
        'bottom-right': 'top-full right-0 mt-2',
        'top-left': 'bottom-full left-0 mb-2',
        'top-right': 'bottom-full right-0 mb-2'
    };

    return (
        <div className={`relative inline-block ${className || ''}`}>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors flex items-center gap-2"
            >
                {trigger || triggerText}
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className={`absolute z-20 ${positionClasses[position]} min-w-[200px] bg-white border border-zinc-200 rounded-lg shadow-lg py-1`}>
                        {items.map((item, idx) => (
                            item.divider ? (
                                <div key={idx} className="my-1 border-t border-zinc-200" />
                            ) : (
                                <a
                                    key={idx}
                                    href={item.href || '#'}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                >
                                    {item.icon && <span>{item.icon}</span>}
                                    {item.label}
                                </a>
                            )
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
