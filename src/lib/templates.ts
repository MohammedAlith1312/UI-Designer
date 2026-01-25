import { ComponentSchema } from "@/types/schema";

const generateId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;

// HERO SECTION TEMPLATE
export const HERO_TEMPLATE: () => ComponentSchema = () => ({
    id: generateId("section"),
    type: "container",
    props: {
        className: "relative bg-gradient-to-br from-indigo-900 to-violet-900 text-white py-32 px-4 overflow-hidden"
    },
    children: [
        {
            id: generateId("stack"),
            type: "stack",
            props: {
                direction: "col",
                align: "center",
                gap: 6,
                className: "max-w-4xl mx-auto text-center z-10 relative"
            },
            children: [
                {
                    id: generateId("badge"),
                    type: "badge",
                    props: {
                        text: "Welcome to Version 2.0",
                        className: "bg-white/10 text-indigo-100 border border-white/20 mb-4"
                    }
                },
                {
                    id: generateId("heading"),
                    type: "heading",
                    props: {
                        level: 1,
                        text: "Build Faster with Dynamic UI",
                        className: "text-5xl md:text-7xl font-bold tracking-tight mb-2"
                    }
                },
                {
                    id: generateId("text"),
                    type: "text",
                    props: {
                        text: "Create stunning, responsive layouts in minutes using our advanced drag-and-drop builder. No coding required.",
                        className: "text-lg md:text-xl text-indigo-100/80 max-w-2xl mx-auto mb-8"
                    }
                },
                {
                    id: generateId("stack"),
                    type: "stack",
                    props: {
                        direction: "row",
                        gap: 4,
                        align: "center",
                        justify: "center"
                    },
                    children: [
                        {
                            id: generateId("button"),
                            type: "button",
                            props: {
                                text: "Get Started Now",
                                variant: "primary",
                                className: "bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-3 rounded-full font-bold shadow-xl transition-transform hover:scale-105"
                            }
                        },
                        {
                            id: generateId("button"),
                            type: "button",
                            props: {
                                text: "View Documentation",
                                variant: "outline",
                                className: "border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-medium"
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

// FEATURE SECTION TEMPLATE
export const FEATURE_TEMPLATE: () => ComponentSchema = () => ({
    id: generateId("section"),
    type: "container",
    props: {
        className: "bg-white py-24 px-4"
    },
    children: [
        {
            id: generateId("container"),
            type: "container",
            props: { className: "max-w-6xl mx-auto" },
            children: [
                {
                    id: generateId("stack"),
                    type: "stack",
                    props: { direction: "col", align: "center", gap: 4, className: "text-center mb-16" },
                    children: [
                        {
                            id: generateId("heading"),
                            type: "heading",
                            props: { level: 2, text: "Powerful Features", className: "text-4xl font-bold text-slate-900" }
                        },
                        {
                            id: generateId("text"),
                            type: "text",
                            props: { text: "Everything you need to build professional applications.", className: "text-slate-500 max-w-xl" }
                        }
                    ]
                },
                {
                    id: generateId("grid"),
                    type: "grid",
                    props: { columns: 3, gap: 8, className: "w-full" },
                    children: [1, 2, 3].map((i) => ({
                        id: generateId("card"),
                        type: "container",
                        props: { className: "p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all" },
                        children: [
                            {
                                id: generateId("icon"),
                                type: "text",
                                props: { text: "✦", className: "text-4xl text-indigo-500 mb-4 block" }
                            },
                            {
                                id: generateId("heading"),
                                type: "heading",
                                props: { level: 3, text: `Feature ${i}`, className: "text-xl font-bold text-slate-900 mb-2" }
                            },
                            {
                                id: generateId("text"),
                                type: "text",
                                props: { text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", className: "text-slate-500 leading-relaxed text-sm" }
                            }
                        ]
                    }))
                }
            ]
        }
    ]
});

// CTA SECTION TEMPLATE
export const CTA_TEMPLATE: () => ComponentSchema = () => ({
    id: generateId("section"),
    type: "container",
    props: {
        className: "bg-slate-900 py-24 px-4 relative overflow-hidden"
    },
    children: [
        {
            id: generateId("stack"),
            type: "stack",
            props: { direction: "col", align: "center", gap: 6, className: "max-w-3xl mx-auto text-center relative z-10" },
            children: [
                {
                    id: generateId("heading"),
                    type: "heading",
                    props: { level: 2, text: "Ready to get started?", className: "text-4xl md:text-5xl font-bold text-white" }
                },
                {
                    id: generateId("text"),
                    type: "text",
                    props: { text: "Join thousands of developers building the future of the web today.", className: "text-slate-400 text-lg mb-4" }
                },
                {
                    id: generateId("button"),
                    type: "button",
                    props: { text: "Start Building Free", className: "bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all hover:scale-105" }
                }
            ]
        }
    ]
});

// FOOTER SECTION TEMPLATE
export const FOOTER_TEMPLATE: () => ComponentSchema = () => ({
    id: generateId("section"),
    type: "container",
    props: {
        className: "bg-white border-t border-slate-200 py-16 px-4"
    },
    children: [
        {
            id: generateId("grid"),
            type: "grid",
            props: { columns: 4, gap: 8, className: "max-w-7xl mx-auto" },
            children: [
                {
                    id: generateId("stack"),
                    type: "stack",
                    props: { direction: "col", gap: 4, className: "col-span-1" },
                    children: [
                        { id: generateId("text"), type: "heading", props: { level: 4, text: "Brand", className: "font-black text-2xl text-slate-800" } },
                        { id: generateId("text"), type: "text", props: { text: "Making the web beautiful, one pixel at a time.", className: "text-slate-400 text-sm" } }
                    ]
                },
                ...["Product", "Company", "Legal"].map((col): ComponentSchema => ({
                    id: generateId("stack"),
                    type: "stack",
                    props: { direction: "col", gap: 3 },
                    children: [
                        { id: generateId("head"), type: "text", props: { text: col, className: "font-bold text-slate-900 mb-2" } },
                        { id: generateId("link1"), type: "text", props: { text: "Link One", className: "text-slate-500 hover:text-indigo-600 cursor-pointer text-sm" } },
                        { id: generateId("link2"), type: "text", props: { text: "Link Two", className: "text-slate-500 hover:text-indigo-600 cursor-pointer text-sm" } },
                        { id: generateId("link3"), type: "text", props: { text: "Link Three", className: "text-slate-500 hover:text-indigo-600 cursor-pointer text-sm" } },
                    ]
                }))
            ]
        },
        {
            id: generateId("container"),
            type: "container",
            props: { className: "max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs" },
            children: [
                { id: generateId("text"), type: "text", props: { text: "© 2024 Dynamic UI Builder. All rights reserved." } },
                { id: generateId("text"), type: "text", props: { text: "Privacy Policy • Terms of Service" } }
            ]
        }
    ]
});
