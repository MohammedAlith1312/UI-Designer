/**
 * Builder State Type Definitions
 * State management types for the builder interface
 */

import { ComponentNode } from './component.types';

// ============================================
// BUILDER STATE
// ============================================

export interface BuilderState {
    // Schema
    schema: ComponentNode;

    // Selection
    selectedId: string | null;
    hoveredId: string | null;

    // History
    history: ComponentNode[];
    historyIndex: number;

    // UI State
    canvasWidth: '100%' | '768px' | '375px';
    showGrid: boolean;
    showOutlines: boolean;

    // Panels
    leftPanelOpen: boolean;
    rightPanelOpen: boolean;
}

// ============================================
// BUILDER ACTIONS
// ============================================

export interface BuilderActions {
    // Schema manipulation
    addComponent: (parentId: string, type: string, index?: number) => void;
    updateComponent: (id: string, props: Record<string, any>) => void;
    deleteComponent: (id: string) => void;
    moveComponent: (id: string, newParentId: string, index?: number) => void;
    duplicateComponent: (id: string) => void;

    // Selection
    selectComponent: (id: string | null) => void;
    hoverComponent: (id: string | null) => void;

    // History
    undo: () => void;
    redo: () => void;

    // UI
    setCanvasWidth: (width: '100%' | '768px' | '375px') => void;
    toggleGrid: () => void;
    toggleOutlines: () => void;
    toggleLeftPanel: () => void;
    toggleRightPanel: () => void;

    // Persistence
    saveToDatabase: () => Promise<void>;
    loadFromDatabase: (id: string) => Promise<void>;
    exportJSON: () => string;
    importJSON: (json: string) => void;
}

// ============================================
// COMBINED STORE
// ============================================

export type BuilderStore = BuilderState & BuilderActions;

// ============================================
// DRAG & DROP TYPES
// ============================================

export interface DragItem {
    type: 'palette' | 'canvas';
    componentType?: string; // For palette items
    componentId?: string; // For canvas items
}

export interface DropZone {
    parentId: string;
    index: number;
}

// ============================================
// CLIPBOARD
// ============================================

export interface ClipboardData {
    node: ComponentNode;
    timestamp: number;
}
