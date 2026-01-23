import React, { useState } from 'react';

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen = false,
    onClose,
    title,
    size = 'md',
    children,
    footer,
    className
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full m-4'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`
                relative bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]}
                animate-in fade-in zoom-in-95 duration-200
                ${className || ''}
            `}>
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between p-6 border-b border-zinc-200">
                        <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200 bg-zinc-50">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
