import { ComponentSchema } from "@/types/schema";

export const DataGridSchema: ComponentSchema = {
    type: "card",
    props: { title: "Advanced Data Components (Tables & Forms)" },
    children: [
        {
            type: "stack",
            props: { gap: 6 },
            children: [
                {
                    type: "grid",
                    props: { cols: 2, gap: 4 },
                    children: [
                        {
                            type: "select",
                            props: {
                                label: "Filter Category",
                                options: [
                                    { label: "All Items", value: "all" },
                                    { label: "Category A", value: "a" },
                                    { label: "Category B", value: "b" }
                                ]
                            }
                        },
                        {
                            type: "select",
                            props: {
                                label: "Status",
                                options: [
                                    { label: "Active", value: "active" },
                                    { label: "Archived", value: "archived" }
                                ]
                            }
                        }
                    ]
                },
                {
                    type: "table",
                    props: {
                        columns: [
                            { key: "item", header: "Item Name", width: "30%" },
                            { key: "category", header: "Category", width: "20%" },
                            { key: "status", header: "Status", width: "20%" },
                            { key: "date", header: "Date Added", width: "30%" }
                        ],
                        data: [
                            { item: "Project Alpha", category: "Development", status: "Active", date: "2023-10-01" },
                            { item: "Marketing Campaign", category: "Marketing", status: "Active", date: "2023-10-05" },
                            { item: "Q4 Financials", category: "Finance", status: "Archived", date: "2023-09-30" }
                        ]
                    }
                }
            ]
        }
    ]
};
