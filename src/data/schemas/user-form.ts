import { ComponentSchema } from "@/types/schema";

export const UserFormSchema: ComponentSchema = {
    type: "card",
    props: { title: "Forms (Step 5 Components)" },
    children: [
        {
            type: "grid",
            props: { cols: 2, gap: 6 },
            children: [
                { type: "input", props: { label: "Full Name", placeholder: "e.g. John Doe" } },
                { type: "input", props: { label: "Email Address", type: "email", placeholder: "john@example.com" } },
                { type: "input", props: { label: "Password", type: "password" } },
                { type: "input", props: { label: "Job Title", placeholder: "e.g. Developer" } },
                {
                    type: "radio",
                    props: {
                        label: "Gender",
                        direction: "row",
                        options: [
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" }
                        ]
                    }
                },
                {
                    type: "checkbox",
                    props: {
                        label: "Interests",
                        direction: "row",
                        options: [
                            { label: "Coding", value: "coding" },
                            { label: "Design", value: "design" },
                            { label: "Marketing", value: "marketing" }
                        ]
                    }
                }

            ]
        }
    ]
};
