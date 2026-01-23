# No-Code/Low-Code Visual Builder Implementation Plan

This roadmap transforms the current schema-based Dynamic Renderer into a fully interactive Visual Builder (similar to Webflow), enabling users to select, edit, reorder, and style components visually.

---

## 🏗 Phase 1: Editor State Management (Foundation)
**Goal**: Create a robust state engine to handle selection, hover, dragging, and updates.

### 1.1 Create `EditorStore` (Zustand or Context)
- **File**: `src/lib/builder/store.ts`
- **State Properties**:
  - `schema`: ScreenSchema (The full JSON tree)
  - `selectedId`: string | null (Currently selected component ID)
  - `hoveredId`: string | null (Currently hovered component ID)
  - `history`: Array<ScreenSchema> (For Undo/Redo)
- **Actions**:
  - `selectComponent(id)`
  - `updateComponentProps(id, props)`
  - `moveComponent(sourceId, targetId, index)`
  - `addComponent(parentId, componentType, index)`
  - `deleteComponent(id)`

### 1.2 Inject IDs Everywhere
- Modify the `DynamicRenderer` to ensure **every** rendered node has a unique ID if one is missing in the schema.
- This is crucial for selection and drag-and-drop targeting.

---

## 🎨 Phase 2: Canvas Interactivity (The "Visual" Part)
**Goal**: Make the rendered page clickable and interactive without breaking the UI.

### 2.1 Enhance `DynamicRenderer`
- **Selection Wrapper**: Wrap every component in an `EditorOverlay` component when `isEditor={true}`.
- **Overlay Features**:
  - **Click Handler**: `stopPropagation` and call `selectComponent(id)`.
  - **Visual Outline**: Add a blue border (`ring-2 ring-blue-500`) when selected.
  - **Hover Effect**: Add a dashed border (`border-dashed border-blue-300`) when hovered.
  - **Label Tag**: Show a small tag (e.g., "Container", "Button") on top-left of selected item.

### 2.2 Disable Native Interactions
- When physically editing, disable links (`<a>`) and form submissions so clicking a button selects it instead of submitting the form.
- Use `pointer-events-none` on children or `e.preventDefault()` in the wrapper.

---

## 🛠 Phase 3: Visual Property Panel (The "Edit" Part)
**Goal**: Allow editing props via a sidebar form instead of raw JSON.

### 3.1 Create `PropertyPanel` Component
- **File**: `src/app/builder/panels/PropertyPanel.tsx`
- **Logic**:
  - Watch `selectedId` from the store.
  - Find the component in the schema.
  - Look up the `PropSchema` in the Registry (need to add this metadata).
  - Render inputs based on prop types:
    - `string` -> Text Input
    - `number` -> Number Input
    - `boolean` -> Toggle Switch
    - `select` -> Dropdown
    - `color` -> Color Picker

### 3.2 Update Registry Metadata
- Modify `registry.tsx` (or a sidebar config) to include "Prop Definitions" for each component.
  - Example:
    ```typescript
    button: {
      component: Button,
      props: {
        label: { type: 'text', label: 'Label' },
        variant: { type: 'select', options: ['primary', 'secondary'] }
      }
    }
    ```

---

## 🖐 Phase 4: Drag and Drop (The "Builder" Part)
**Goal**: Allow reordering and nesting.

### 4.1 Integration with @dnd-kit
- Wrap the entire Canvas in `<DndContext>`.
- Make every component a `<Draggable>` and `<Droppable>`.
- **Drag Source**: A small handle icon on the selected overlay.
- **Drop Target**: The container or gaps between elements.

### 4.2 Handling Drops
- When dropping `Item A` over `Container B`:
  - Update schema: Remove `Item A` from old parent -> Add to `Container B`.

---

## 🧰 Phase 5: Component Palette (The "Add" Part)
**Goal**: Drag new items onto the canvas.

### 5.1 Create `ComponentPalette`
- A left sidebar listing available components (Text, Button, Container, etc.).
- These are "Draggable Sources" that create *new* instances when dropped.

---

## 🚀 Implementation Priority Checklist

1. [ ] **Step 1:** Create `EditorContext` to manage `selectedId` and `schema`.
2. [ ] **Step 2:** Refactor `DynamicRenderer` to use this Context and handle clicks.
3. [ ] **Step 3:** Build `PropertyPanel` to edit the selected component's text/props.
4. [ ] **Step 4:** Define `PropSchemas` for at least 3 core components (Button, Text, Container).
5. [ ] **Step 5:** Assemble the `BuilderPage` layout (Left: Palette, Center: Canvas, Right: Props).
