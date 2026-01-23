import { ScreenSchema } from "@/types/schema";
import { HeaderSchema } from "./schemas/header";
import { LayoutGridSchema } from "./schemas/stats-grid";
import { AtomicElementsSchema } from "./schemas/atomic-elements";
import { UserFormSchema } from "./schemas/user-form";
import { DataGridSchema } from "./schemas/data-grid";

export const TestScreenSchema: ScreenSchema = {
    screenId: "verification-dashboard",
    title: "Dynamic Component Gallery",

    root: {
        type: "container",
        props: { maxWidth: "4xl", padding: 8 },
        children: [
            HeaderSchema,
            LayoutGridSchema,
            AtomicElementsSchema,
            UserFormSchema,
            DataGridSchema
        ]
    }
};
