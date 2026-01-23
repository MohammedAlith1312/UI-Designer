export type ComponentType =
    // Layout
    | "container" | "grid" | "stack" | "section" | "tabs" | "accordion"
    // General
    | "text" | "heading" | "button" | "icon" | "image" | "divider" | "link" | "list"
    // Forms
    | "form" | "form-group" | "input" | "select" | "checkbox" | "radio" | "date-picker" | "textarea"
    // Display
    | "card" | "table" | "table-head" | "table-row" | "table-cell" | "badge" | "avatar" | "list"
    // Advanced UI Blocks
    | "hero" | "chart";

/**
 * Single UI node definition
 */
export interface ComponentSchema {
    /**
     * Optional unique ID for workflows, rules, debugging
     */
    id?: string;

    /**
     * Component type (maps to registry)
     */
    type: ComponentType;

    /**
     * Props passed into the React component
     */
    props?: Record<string, any>;

    /**
     * Inline styles for granular design control
     */
    style?: React.CSSProperties;

    /**
     * Child UI nodes (layout nesting)
     */
    children?: ComponentSchema[];
}

/**
 * One complete screen/page definition
 */
export interface ScreenSchema {
    /**
     * Unique screen identifier
     */
    screenId: string;

    /**
     * Optional display title
     */
    title?: string;

    /**
     * Root UI node (single entry point)
     */
    root: ComponentSchema;
}
