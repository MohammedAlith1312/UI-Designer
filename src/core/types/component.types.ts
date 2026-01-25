/**
 * Core Component Type Definitions
 * Clean, type-safe interfaces for the entire system
 */

import { ReactNode } from 'react';

// ============================================
// COMPONENT TYPES
// ============================================

export type ComponentCategory =
    | 'layout'
    | 'typography'
    | 'forms'
    | 'display'
    | 'navigation'
    | 'media'
    | 'feedback'
    | 'sections';

export type ComponentType = string; // e.g., 'container', 'heading', 'button'

// ============================================
// COMPONENT PROPS
// ============================================

export interface BaseComponentProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
}

// ============================================
// PROPERTY DEFINITIONS
// ============================================

export type PropertyType =
    | 'text'
    | 'number'
    | 'select'
    | 'boolean'
    | 'color'
    | 'slider'
    | 'textarea'
    | 'array'
    | 'object';

export interface PropertyDefinition {
    name: string;
    type: PropertyType;
    label: string;
    defaultValue?: any;
    options?: Array<{ label: string; value: any }>;
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    description?: string;
}

// ============================================
// COMPONENT CONFIGURATION
// ============================================

export interface ComponentConfig {
    type: ComponentType;
    category: ComponentCategory;
    label: string;
    description?: string;
    icon?: string;
    defaultProps: Record<string, any>;
    properties: PropertyDefinition[];
    canHaveChildren?: boolean;
    allowedParents?: ComponentType[];
    allowedChildren?: ComponentType[];
}

// ============================================
// COMPONENT INSTANCE (Schema Node)
// ============================================

export interface ComponentNode {
    id: string;
    type: ComponentType;
    props: Record<string, any>;
    children?: ComponentNode[];
    parentId?: string;
}

// ============================================
// COMPONENT REGISTRY
// ============================================

export interface ComponentRegistryEntry {
    component: React.ComponentType<any>;
    config: ComponentConfig;
}

export type ComponentRegistry = Record<ComponentType, ComponentRegistryEntry>;

// ============================================
// EXPORTS
// ============================================

export type {
    ReactNode
};
