"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemePreset = "blue" | "purple" | "emerald" | "rose" | "slate" | "custom";

export interface ThemeColors {
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
}

const THEME_PRESETS: Record<ThemePreset, ThemeColors> = {
    blue: {
        primary: "bg-blue-600",
        primaryHover: "hover:bg-blue-700",
        secondary: "bg-blue-50",
        accent: "bg-blue-100",
        background: "bg-white",
        surface: "bg-zinc-50",
        text: "text-zinc-900",
        textMuted: "text-zinc-500",
        border: "border-zinc-200",
    },
    purple: {
        primary: "bg-purple-600",
        primaryHover: "hover:bg-purple-700",
        secondary: "bg-purple-50",
        accent: "bg-purple-100",
        background: "bg-white",
        surface: "bg-zinc-50",
        text: "text-zinc-900",
        textMuted: "text-zinc-500",
        border: "border-zinc-200",
    },
    emerald: {
        primary: "bg-emerald-600",
        primaryHover: "hover:bg-emerald-700",
        secondary: "bg-emerald-50",
        accent: "bg-emerald-100",
        background: "bg-white",
        surface: "bg-zinc-50",
        text: "text-zinc-900",
        textMuted: "text-zinc-500",
        border: "border-zinc-200",
    },
    rose: {
        primary: "bg-rose-600",
        primaryHover: "hover:bg-rose-700",
        secondary: "bg-rose-50",
        accent: "bg-rose-100",
        background: "bg-white",
        surface: "bg-zinc-50",
        text: "text-zinc-900",
        textMuted: "text-zinc-500",
        border: "border-zinc-200",
    },
    slate: {
        primary: "bg-slate-700",
        primaryHover: "hover:bg-slate-800",
        secondary: "bg-slate-100",
        accent: "bg-slate-200",
        background: "bg-slate-50",
        surface: "bg-white",
        text: "text-slate-900",
        textMuted: "text-slate-600",
        border: "border-slate-300",
    },
    custom: {
        primary: "bg-blue-600",
        primaryHover: "hover:bg-blue-700",
        secondary: "bg-blue-50",
        accent: "bg-blue-100",
        background: "bg-white",
        surface: "bg-zinc-50",
        text: "text-zinc-900",
        textMuted: "text-zinc-500",
        border: "border-zinc-200",
    },
};

interface ThemeContextType {
    currentTheme: ThemePreset;
    setTheme: (theme: ThemePreset) => void;
    colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemePreset>("blue");

    const setTheme = (theme: ThemePreset) => {
        setCurrentTheme(theme);
    };

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                setTheme,
                colors: THEME_PRESETS[currentTheme],
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
