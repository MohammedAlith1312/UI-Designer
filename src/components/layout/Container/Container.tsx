/**
 * Container Component - Clean Implementation
 */

import React from 'react';
import { BaseComponentProps } from '@/core/types/component.types';

// ============================================
// PROPS INTERFACE
// ============================================

export interface ContainerProps extends BaseComponentProps {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    padding?: 0 | 2 | 4 | 6 | 8 | 12;
    background?: string;
    border?: boolean;
    shadow?: 'none' | 'sm' | 'md' | 'lg';
}

// ============================================
// COMPONENT
// ============================================

export const Container: React.FC<ContainerProps> = ({
    maxWidth = 'lg',
    padding = 4,
    background,
    border = false,
    shadow = 'none',
    children,
    className = '',
    style
}) => {
    // Max width classes
    const maxWidthClasses = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        full: 'max-w-full'
    };

    // Shadow classes
    const shadowClasses = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg'
    };

    return (
        <div
            className={`
        ${maxWidthClasses[maxWidth]}
        mx-auto
        p-${padding}
        ${background || ''}
        ${border ? 'border border-zinc-200' : ''}
        ${shadowClasses[shadow]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
            style={style}
        >
            {children}
        </div>
    );
};

// ============================================
// DISPLAY NAME
// ============================================

Container.displayName = 'Container';
