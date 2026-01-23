import { ComponentSchema } from "@/types/schema";

export const HeaderSchema: ComponentSchema = {
    type: "stack",
    props: { gap: 4, margin: 6 },
    children: [
        {
            type: "heading",
            props: { text: "Dynamic Component Gallery", level: 1 }
        },
        {
            type: "text",
            props: { text: "Visual verification of the Component Registry, Layout System, and Atomic Elements." }
        },
        { type: "divider", props: {} }
    ]
};
