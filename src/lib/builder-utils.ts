import { ComponentSchema } from "@/types/schema";

/**
 * UTILITY: findNode
 * Recursively searches for a node by ID.
 */
export function findNode(root: ComponentSchema, id: string): ComponentSchema | null {
    if (root.id === id) return root;
    if (root.children) {
        for (const child of root.children) {
            const found = findNode(child, id);
            if (found) return found;
        }
    }
    return null;
}

/**
 * UTILITY: findParentNode
 * Returns the parent of the node with the given ID.
 */
export function findParentNode(root: ComponentSchema, childId: string): ComponentSchema | null {
    if (root.children) {
        for (const child of root.children) {
            if (child.id === childId) return root;
            const found = findParentNode(child, childId);
            if (found) return found;
        }
    }
    return null;
}

/**
 * UTILITY: updateNode
 * Immutable update of a node's properties.
 */
export function updateNode(root: ComponentSchema, id: string, updates: Partial<ComponentSchema>): ComponentSchema {
    if (root.id === id) {
        return { ...root, ...updates };
    }
    if (root.children) {
        return {
            ...root,
            children: root.children.map(child => updateNode(child, id, updates))
        };
    }
    return root;
}

/**
 * UTILITY: deleteNode
 * Removes a node by ID.
 */
export function deleteNode(root: ComponentSchema, id: string): ComponentSchema {
    // If root itself matches, we probably shouldn't delete it (or handle it upstream), but here we return it as is or null. 
    // Usually we delete children.
    if (root.id === id) return root;

    if (root.children) {
        return {
            ...root,
            children: root.children
                .filter(child => child.id !== id)
                .map(child => deleteNode(child, id))
        };
    }
    return root;
}

/**
 * UTILITY: moveNode
 * Moves a node (by direction 'up' or 'down') within its siblings.
 */
export function moveNode(root: ComponentSchema, id: string, direction: 'up' | 'down'): ComponentSchema {
    if (root.children) {
        const index = root.children.findIndex(c => c.id === id);
        if (index !== -1) {
            // Found the parent of the item to move
            const newChildren = [...root.children];
            if (direction === 'up' && index > 0) {
                [newChildren[index], newChildren[index - 1]] = [newChildren[index - 1], newChildren[index]];
                return { ...root, children: newChildren };
            }
            if (direction === 'down' && index < newChildren.length - 1) {
                [newChildren[index], newChildren[index + 1]] = [newChildren[index + 1], newChildren[index]];
                return { ...root, children: newChildren };
            }
            return root; // Can't move further
        }

        // Continue searching deeper
        return {
            ...root,
            children: root.children.map(child => moveNode(child, id, direction))
        };
    }
    return root;
}

/**
 * UTILITY: appendChild
 * Adds a new child to a container.
 */
export function appendChild(root: ComponentSchema, parentId: string, newChild: ComponentSchema): ComponentSchema {
    if (root.id === parentId) {
        return {
            ...root,
            children: [...(root.children || []), newChild]
        };
    }
    if (root.children) {
        return {
            ...root,
            children: root.children.map(child => appendChild(child, parentId, newChild))
        };
    }
    return root;
}
