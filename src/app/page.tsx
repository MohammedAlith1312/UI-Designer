"use client";

import React, { useState, useEffect } from "react";
import DynamicRenderer from "@/app/components/DynamicRendered";
import { ScreenSchema, ComponentSchema } from "@/types/schema";
import { CustomComponent } from "@/lib/db"; // Type definition

// Default starting schema for new components
const DEFAULT_SCHEMA: ScreenSchema = {
  screenId: "new-screen",
  title: "New Dynamic Component",
  root: {
    type: "container",
    props: { className: "p-4 border rounded shadow-sm bg-white" },
    children: [
      { type: "heading", props: { level: 2, text: "Edit Me!" } }
    ]
  }
};

export default function Home() {
  const [components, setComponents] = useState<CustomComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<CustomComponent | null>(null);

  // Editor State
  const [editorJson, setEditorJson] = useState<string>(JSON.stringify(DEFAULT_SCHEMA, null, 2));
  const [name, setName] = useState("");
  const [category, setCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch from DB on load
  const loadComponents = async () => {
    try {
      const res = await fetch("/api/dynamic-component");
      if (res.ok) {
        const data = await res.json();
        setComponents(data);
      }
    } catch (e) {
      console.error("Failed to load", e);
    }
  };

  useEffect(() => {
    loadComponents();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) return alert("Please enter a name");

    try {
      setIsLoading(true);
      const parsedSchema = JSON.parse(editorJson);

      const payload = {
        name,
        category,
        schema: parsedSchema,
        props_schema: {}, // Optional extra metadata
        is_public: true
      };

      const res = await fetch("/api/dynamic-component", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await loadComponents();
        setName("");
        alert("Saved successfully!");
      } else {
        alert("Failed to save");
      }
    } catch (e) {
      alert("Invalid JSON format");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (comp: CustomComponent) => {
    setSelectedComponent(comp);
    // Also load it into editor so they can base a new on it if they want
    setEditorJson(JSON.stringify(comp.schema, null, 2));
    setName(comp.name + " (Copy)");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row font-sans text-zinc-900">

      {/* SIDEBAR: List of Saved Components */}
      <div className="w-full md:w-80 bg-white border-r border-zinc-200 p-6 flex flex-col h-screen overflow-hidden">
        <h2 className="text-xl font-bold mb-6">Saved Components</h2>

        <div className="flex-1 overflow-y-auto space-y-2">
          {components.length === 0 && <p className="text-zinc-400 text-sm">No components found.</p>}
          {components.map(comp => (
            <div
              key={comp.id}
              onClick={() => handleSelect(comp)}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md
                        ${selectedComponent?.id === comp.id ? 'bg-blue-50 border-blue-500' : 'bg-zinc-50 border-zinc-200'}
                    `}
            >
              <div className="font-bold text-sm">{comp.name}</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">{comp.category}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-100">
          <button
            onClick={() => setSelectedComponent(null)}
            className="w-full py-2 bg-zinc-800 text-white rounded-md text-sm font-bold hover:bg-black transition-colors"
          >
            + Create New
          </button>
        </div>
      </div>

      {/* MAIN CONTENT Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* VIEW AREA */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-400">
                PREVIEW: {selectedComponent ? selectedComponent.name : "New Component"}
              </h2>
            </div>

            {/* THE DYNAMIC RENDERER */}
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 min-h-[400px] p-6">
              {/* If selected, render that. If not, try to render what's in the JSON editor preview */}
              <ErrorBoundary>
                <DynamicRenderer
                  schema={selectedComponent ? selectedComponent.schema : safeJsonParse(editorJson, DEFAULT_SCHEMA)}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>

        {/* JSON EDITOR (Bottom Panel) */}
        {!selectedComponent && (
          <div className="h-1/3 bg-white border-t border-zinc-200 p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-10 flex gap-6">
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-bold text-zinc-500 mb-2">JSON DEFINITION</label>
              <textarea
                value={editorJson}
                onChange={(e) => setEditorJson(e.target.value)}
                className="flex-1 w-full bg-zinc-50 border border-zinc-200 rounded-md p-4 font-mono text-xs resize-none focus:ring-2 ring-blue-500 outline-none"
              />
            </div>

            <div className="w-64 flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-500 mb-2">COMPONENT NAME</label>
                <input
                  type="text"
                  className="w-full p-2 border border-zinc-200 rounded text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. User Card"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 mb-2">CATEGORY</label>
                <select
                  className="w-full p-2 border border-zinc-200 rounded text-sm bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="general">General</option>
                  <option value="form">Form</option>
                  <option value="layout">Layout</option>
                  <option value="display">Display</option>
                </select>
              </div>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="mt-auto w-full py-3 bg-blue-600 text-white font-bold rounded shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-sm"
              >
                {isLoading ? "Saving..." : "Save Component"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to prevent full app crash on bad JSON
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) { console.error(error); }
  render() {
    if (this.state.hasError) return <div className="text-red-500 p-4">Invalid Schema Configuration</div>;
    return this.props.children;
  }
}

function safeJsonParse(str: string, fallback: any) {
  try { return JSON.parse(str); } catch { return fallback; }
}
