import React from "react";
import { ComponentType } from "@/types/schema";
import { Placeholder } from "@/components/dynamic-ui/Placeholder";

// Layout Components
import { Container } from "@/components/dynamic-ui/layout/Container";
import { Stack } from "@/components/dynamic-ui/layout/Stack";
import { Grid } from "@/components/dynamic-ui/layout/Grid";

// General Components
import { Heading } from "@/components/dynamic-ui/general/Heading";
import { Text } from "@/components/dynamic-ui/general/Text";
import { Button } from "@/components/dynamic-ui/general/Button";
import { Divider } from "@/components/dynamic-ui/general/Divider";
import { Link } from "@/components/dynamic-ui/general/Link";
import { Image } from "@/components/dynamic-ui/general/Image";

// Form Components
import { Input } from "@/components/dynamic-ui/form/Input";
import { Select } from "@/components/dynamic-ui/form/Select";
import { Radio } from "@/components/dynamic-ui/form/Radio";
import { Checkbox } from "@/components/dynamic-ui/form/Checkbox";
import { Form, FormGroup } from "@/components/dynamic-ui/form/FormElements";

// Display Components
import { Card } from "@/components/dynamic-ui/display/Card";
import { Badge } from "@/components/dynamic-ui/display/Badge";
import { Table } from "@/components/dynamic-ui/display/Table";
import { TableHead, TableRow, TableCell } from "@/components/dynamic-ui/display/TableElements";
import { List } from "@/components/dynamic-ui/display/List";

/**
 * Core Component Registry (Step 5.5 - Modularized)
 */
const ComponentRegistry: Partial<
    Record<ComponentType, React.ComponentType<any>>
> = {
    // ─────────────────────────────
    // Layout
    // ─────────────────────────────
    container: Container,
    stack: Stack,
    grid: Grid,
    section: (props: any) => <Placeholder type="section" props={props} />,
    tabs: (props: any) => <Placeholder type="tabs" props={props} />,
    accordion: (props: any) => <Placeholder type="accordion" props={props} />,

    // ─────────────────────────────
    // General
    // ─────────────────────────────
    heading: Heading,
    text: Text,
    button: Button,
    divider: Divider,
    link: Link,
    image: Image,
    icon: (props: any) => <Placeholder type="icon" props={props} />,

    // ─────────────────────────────
    // Forms
    // ─────────────────────────────
    form: Form,
    "form-group": FormGroup,
    input: Input,
    select: Select,
    checkbox: Checkbox,
    radio: Radio,
    "date-picker": (props: any) => (
        <Placeholder type="date-picker" props={props} />
    ),
    textarea: (props: any) => <Placeholder type="textarea" props={props} />,

    // ─────────────────────────────
    // Display
    // ─────────────────────────────
    card: Card,
    table: Table,
    "table-head": TableHead,
    "table-row": TableRow,
    "table-cell": TableCell,
    badge: Badge,
    avatar: (props: any) => <Placeholder type="avatar" props={props} />,
    list: List,

    // ─────────────────────────────
    // Specialized
    // ─────────────────────────────
    hero: (props: any) => <Placeholder type="hero" props={props} />,
    chart: (props: any) => <Placeholder type="chart" props={props} />,
};

export default ComponentRegistry;
