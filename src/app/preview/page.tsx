"use client";

import React, { useEffect, useState } from "react";
import DynamicRenderer from "@/app/components/DynamicRendered";
import { ScreenSchema } from "@/types/schema";

export default function PreviewPage() {
    const [schema, setSchema] = useState<ScreenSchema | null>(null);

    useEffect(() => {
        // Load schema from localStorage for instant preview
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("builder_preview_schema");
            if (saved) {
                try {
                    setSchema(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse preview schema", e);
                }
            }
        }
    }, []);

    if (!schema) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-zinc-500">
                Loading preview...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <DynamicRenderer schema={schema} isEditor={false} />
        </div>
    );
}
