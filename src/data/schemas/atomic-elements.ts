import { ComponentSchema } from "@/types/schema";

export const AtomicElementsSchema: ComponentSchema = {
    type: "stack",
    props: { gap: 6, margin: 6 },
    children: [
        {
            type: "heading",
            props: { text: "Step 5: Atomic Components", level: 2 }
        },
        {
            type: "card",
            props: { title: "Display & General" },
            children: [
                {
                    type: "stack",
                    props: { gap: 4 },
                    children: [
                        {
                            type: "stack",
                            props: { direction: "row", gap: 2, align: "center" },
                            children: [
                                { type: "text", props: { text: "Badges:" } },
                                { type: "badge", props: { text: "Success", variant: "success" } },
                                { type: "badge", props: { text: "Warning", variant: "warning" } },
                                { type: "badge", props: { text: "Error", variant: "error" } },
                                { type: "badge", props: { text: "Neutral", variant: "neutral" } },
                            ]
                        },
                        { type: "divider", props: {} },
                        {
                            type: "stack",
                            props: { direction: "row", gap: 4 },
                            children: [
                                {
                                    type: "button",
                                    props: {
                                        label: "Submit Form",
                                        variant: "primary",
                                        action: { type: "submit" }
                                    }
                                },
                                {
                                    type: "button",
                                    props: {
                                        label: "Clear All",
                                        variant: "outline",
                                        action: { type: "reset" }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
