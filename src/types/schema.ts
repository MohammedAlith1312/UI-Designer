export type ComponentType =
    // Layout
    | "container" | "grid" | "stack" | "section" | "tabs" | "accordion"
    | "split-pane" | "scroll-area" | "resizable-panel" | "flex-container"
    // General
    | "text" | "heading" | "button" | "icon" | "image" | "divider" | "link" | "list"
    | "icon-button" | "button-group" | "fab"
    // Forms
    | "form" | "form-group" | "input" | "select" | "checkbox" | "radio" | "date-picker" | "textarea"
    | "toggle" | "slider" | "file-upload" | "color-picker" | "rating" | "rich-text-editor"
    // Display
    | "card" | "table" | "table-head" | "table-row" | "table-cell" | "badge" | "avatar" | "list"
    | "data-grid" | "pricing-card" | "profile-card" | "article-card"
    // Navigation
    | "navbar" | "dropdown-menu" | "mobile-menu" | "breadcrumbs" | "sidebar" | "pagination"
    // Media
    | "video" | "audio" | "gallery" | "carousel" | "lightbox" | "background-video" | "iframe"
    // Feedback
    | "modal" | "drawer" | "toast" | "alert" | "progress" | "spinner" | "tooltip" | "popover"
    // Advanced UI Blocks
    | "hero" | "chart" | "map" | "code-editor" | "repeater" | "conditional"
    // Sections
    | "hero-section" | "feature-section" | "testimonial-section" | "cta-section" | "footer-section";

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
