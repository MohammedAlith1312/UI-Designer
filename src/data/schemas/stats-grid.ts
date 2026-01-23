import { ComponentSchema } from "@/types/schema";

export const LayoutGridSchema: ComponentSchema = {
    type: "card",
    props: { title: "Step 4: Layout System (Grid & Stack)" },
    children: [
        {
            type: "grid",
            props: { cols: 3, gap: 4 },
            children: [
                {
                    type: "stack",
                    props: { padding: 4, className: "bg-zinc-50 rounded" },
                    children: [
                        { type: "heading", props: { text: "Col 1", level: 3 } },
                        { type: "text", props: { text: "Testing Grid Column 1" } }
                    ]
                },
                {
                    type: "stack",
                    props: { padding: 4, className: "bg-zinc-50 rounded" },
                    children: [
                        { type: "heading", props: { text: "Col 2", level: 3 } },
                        { type: "text", props: { text: "Testing Grid Column 2" } }
                    ]
                },
                {
                    type: "stack",
                    props: { padding: 4, className: "bg-zinc-50 rounded" },
                    children: [
                        { type: "heading", props: { text: "Col 3", level: 3 } },
                        { type: "text", props: { text: "Testing Grid Column 3" } }
                    ]
                }
            ]
        }
    ]
};
