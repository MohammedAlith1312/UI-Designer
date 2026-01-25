"use client";

import React from 'react';
import { useUIState } from '@/lib/dynamic-ui/context';

interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    action?: {
        type: "submit" | "reset" | "alert" | "custom";
        payload?: any;
    };
    style?: React.CSSProperties;
}

export const Button: React.FC<any> = ({
    label,
    text,
    children,
    variant = "primary",
    className,
    action,
    style
}) => {
    const { state, resetForm } = useUIState();

    const baseClass =
        "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 font-outfit inline-flex items-center justify-center";

    const variants: Record<string, string> = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200",
        secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        outline: "border-2 border-zinc-200 hover:border-zinc-800",
        danger: "bg-red-500 text-white hover:bg-red-600",
        custom: "" // No default styles, allows full customization via Setup/Style panel
    };

    const handleClick = () => {
        if (!action) return;

        switch (action.type) {
            case "submit":
                console.log("🚀 Form Data Submitted:", state.values);
                alert("Form Data Submitted! (Check console for details)");
                break;
            case "reset":
                resetForm();
                console.log("♻️ Form Reset");
                break;
            case "alert":
                alert(action.payload || "Button Clicked!");
                break;
            default:
                console.log("Action Triggered:", action);
        }
    };

    // content priority: children > text > label
    const content = children || text || label || "Button";

    return (
        <button
            className={`${baseClass} ${variants[variant] || variants.primary} ${className || ""}`}
            onClick={handleClick}
            style={style}
        >
            {content}
        </button>
    );
};
