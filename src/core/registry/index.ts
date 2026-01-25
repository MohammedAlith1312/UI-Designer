/**
 * Component Registry - Clean Implementation
 * Central registry for all UI components
 */

import { ComponentRegistry } from '@/core/types/component.types';

// Import components
import { Container, ContainerConfig } from '@/components/layout/Container';

// ============================================
// REGISTRY
// ============================================

export const componentRegistry: ComponentRegistry = {
    // Layout Components
    container: {
        component: Container,
        config: ContainerConfig
    },

    // More components will be added here...
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get component by type
 */
export function getComponent(type: string) {
    const entry = componentRegistry[type];
    return entry?.component || null;
}

/**
 * Get component config by type
 */
export function getComponentConfig(type: string) {
    const entry = componentRegistry[type];
    return entry?.config || null;
}

/**
 * Get all components by category
 */
export function getComponentsByCategory(category: string) {
    return Object.entries(componentRegistry)
        .filter(([_, entry]) => entry.config.category === category)
        .map(([_, entry]) => entry.config);
}

/**
 * Get all component types
 */
export function getAllComponentTypes() {
    return Object.keys(componentRegistry);
}

/**
 * Check if component can have children
 */
export function canHaveChildren(type: string): boolean {
    const config = getComponentConfig(type);
    return config?.canHaveChildren ?? false;
}

/**
 * Check if component can be dropped in parent
 */
export function canDropInParent(childType: string, parentType: string): boolean {
    const childConfig = getComponentConfig(childType);

    if (!childConfig) return false;
    if (!childConfig.allowedParents) return true; // No restrictions

    return childConfig.allowedParents.includes(parentType);
}
