/**
 * Container Component Configuration
 */

import { ComponentConfig } from '@/core/types/component.types';

export const ContainerConfig: ComponentConfig = {
    type: 'container',
    category: 'layout',
    label: 'Container',
    description: 'A responsive container with max-width constraints',
    icon: '📦',

    defaultProps: {
        maxWidth: 'lg',
        padding: 4,
        background: '',
        border: false,
        shadow: 'none'
    },

    properties: [
        {
            name: 'maxWidth',
            type: 'select',
            label: 'Max Width',
            defaultValue: 'lg',
            options: [
                { label: 'Small (640px)', value: 'sm' },
                { label: 'Medium (768px)', value: 'md' },
                { label: 'Large (1024px)', value: 'lg' },
                { label: 'Extra Large (1280px)', value: 'xl' },
                { label: 'Full Width', value: 'full' }
            ]
        },
        {
            name: 'padding',
            type: 'select',
            label: 'Padding',
            defaultValue: 4,
            options: [
                { label: 'None', value: 0 },
                { label: 'Small (0.5rem)', value: 2 },
                { label: 'Medium (1rem)', value: 4 },
                { label: 'Large (1.5rem)', value: 6 },
                { label: 'Extra Large (2rem)', value: 8 },
                { label: 'XXL (3rem)', value: 12 }
            ]
        },
        {
            name: 'background',
            type: 'text',
            label: 'Background Class',
            defaultValue: '',
            placeholder: 'e.g., bg-white, bg-zinc-50'
        },
        {
            name: 'border',
            type: 'boolean',
            label: 'Show Border',
            defaultValue: false
        },
        {
            name: 'shadow',
            type: 'select',
            label: 'Shadow',
            defaultValue: 'none',
            options: [
                { label: 'None', value: 'none' },
                { label: 'Small', value: 'sm' },
                { label: 'Medium', value: 'md' },
                { label: 'Large', value: 'lg' }
            ]
        }
    ],

    canHaveChildren: true,
    allowedParents: ['root', 'section', 'grid', 'stack'],
    allowedChildren: undefined // Can contain any component
};
