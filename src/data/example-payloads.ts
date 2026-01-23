import { ScreenSchema } from '@/types/schema';

// ----------------------------------------------------------------------
// 1. APP SCENARIO
// ----------------------------------------------------------------------

// This is the object you would send to POST /api/apps (or use in AppService.saveApp)
// to create a new application container.
export const NewAppPayload = {
    name: "Enterprise Dashboard",
    slug: "enterprise-dashboard",
    description: "A comprehensive admin dashboard for managing users and analytics.",
    is_published: true,
    theme: {
        mode: "light",
        primaryColor: "#0ea5e9", // Sky blue
        fontFamily: "Inter, sans-serif"
    },
    metadata: {
        version: "1.0.0",
        createdBy: "admin-user",
        tags: ["admin", "analytics", "internal"]
    }
};

// ----------------------------------------------------------------------
// 2. PAGE SCENARIO (Dashboard Page)
// ----------------------------------------------------------------------

// The Schema Definition (The actual UI structure)
const DashboardScreen: ScreenSchema = {
    screenId: "dashboard-main",
    title: "Executive Overview",
    root: {
        type: "container",
        props: {
            maxWidth: "7xl",
            padding: 8,
            className: "min-h-screen bg-zinc-50"
        },
        children: [
            // Top Bar
            {
                type: "stack",
                props: { direction: "row", justify: "between", align: "center", className: "mb-8" },
                children: [
                    {
                        type: "heading",
                        props: { text: "Executive Overview", level: 1 }
                    },
                    {
                        type: "button",
                        props: { label: "Export Report", variant: "outline" }
                    }
                ]
            },
            // Stats Row
            {
                type: "grid",
                props: { cols: 4, gap: 4, className: "mb-8" },
                children: [
                    {
                        type: "card",
                        props: { title: "Total Revenue" },
                        children: [
                            { type: "heading", props: { text: "$124,500", level: 2 } },
                            { type: "text", props: { text: "+12.5% from last month", className: "text-green-600 text-sm" } }
                        ]
                    },
                    {
                        type: "card",
                        props: { title: "Active Users" },
                        children: [
                            { type: "heading", props: { text: "8,234", level: 2 } },
                            { type: "text", props: { text: "+5.2% new signups", className: "text-zinc-500 text-sm" } }
                        ]
                    },
                    {
                        type: "card",
                        props: { title: "Bounce Rate" },
                        children: [
                            { type: "heading", props: { text: "42.3%", level: 2 } },
                            { type: "text", props: { text: "-2.1% improvement", className: "text-green-600 text-sm" } }
                        ]
                    },
                    {
                        type: "card",
                        props: { title: "Server Load" },
                        children: [
                            { type: "heading", props: { text: "24%", level: 2 } },
                            { type: "badge", props: { text: "Healthy", variant: "success" } }
                        ]
                    }
                ]
            },
            // Main Content Area
            {
                type: "grid",
                props: { cols: 3, gap: 6 },
                children: [
                    // Recent Activity Table (Spans 2 columns)
                    {
                        type: "card",
                        props: { title: "Recent Transactions", className: "col-span-2" },
                        children: [
                            {
                                type: "table",
                                props: {
                                    columns: [
                                        { key: "id", header: "ID", width: "15%" },
                                        { key: "customer", header: "Customer", width: "35%" },
                                        { key: "amount", header: "Amount", width: "20%" },
                                        { key: "status", header: "Status", width: "20%" }
                                    ],
                                    data: [
                                        { id: "#TRX-001", customer: "Acme Corp", amount: "$1,200.00", status: "Completed" },
                                        { id: "#TRX-002", customer: "Globex Inc", amount: "$3,450.00", status: "Processing" },
                                        { id: "#TRX-003", customer: "Soylent Corp", amount: "$850.00", status: "Completed" },
                                        { id: "#TRX-004", customer: "Initech", amount: "$2,100.00", status: "Failed" }
                                    ]
                                }
                            }
                        ]
                    },
                    // Quick Actions (Spans 1 column)
                    {
                        type: "card",
                        props: { title: "Quick Actions" },
                        children: [
                            {
                                type: "stack",
                                props: { gap: 3 },
                                children: [
                                    { type: "button", props: { label: "Add New User", variant: "primary", className: "w-full" } },
                                    { type: "button", props: { label: "Create Invoice", variant: "outline", className: "w-full" } },
                                    { type: "divider", props: {} },
                                    { type: "text", props: { text: "System Status", className: "font-medium" } },
                                    { type: "badge", props: { text: "All Systems Operational", variant: "success" } }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// The Request Payload (This is what you send to POST /api/pages)
export const NewPagePayload = {
    // app_id: "UUID_OF_THE_APP_CREATED_ABOVE", // You would plug the real App UUID here
    name: "Dashboard",
    route: "/dashboard",
    order: 0,
    metadata: {
        role: "admin",
        layout: "sidebar"
    },
    schema: DashboardScreen
};
