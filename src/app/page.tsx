"use client";

import React from "react";
import { EditorProvider } from "@/lib/builder-context";
import BuilderLayout from "@/components/builder/BuilderLayout";

export default function BuilderPage() {
  return (
    <EditorProvider>
      <BuilderLayout />
    </EditorProvider>
  );
}
