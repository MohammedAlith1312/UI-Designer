import React from "react";
import { ComponentType } from "@/types/schema";
import { Placeholder } from "@/components/dynamic-ui/Placeholder";

// Layout Components
import { Container } from "@/components/dynamic-ui/layout/Container";
import { Stack } from "@/components/dynamic-ui/layout/Stack";
import { Grid } from "@/components/dynamic-ui/layout/Grid";
import { SplitPane } from "@/components/dynamic-ui/layout/SplitPane";
import { ScrollArea } from "@/components/dynamic-ui/layout/ScrollArea";
import { Tabs } from "@/components/dynamic-ui/layout/Tabs";
import { Accordion } from "@/components/dynamic-ui/layout/Accordion";

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
import { Toggle } from "@/components/dynamic-ui/form/Toggle";
import { Slider } from "@/components/dynamic-ui/form/Slider";
import { FileUpload } from "@/components/dynamic-ui/form/FileUpload";
import { Textarea } from "@/components/dynamic-ui/form/Textarea";
import { Label } from "@/components/dynamic-ui/form/Label";

// Display Components
import { Card } from "@/components/dynamic-ui/display/Card";
import { Badge } from "@/components/dynamic-ui/display/Badge";
import { Table } from "@/components/dynamic-ui/display/Table";
import { TableHead, TableRow, TableCell } from "@/components/dynamic-ui/display/TableElements";
import { List } from "@/components/dynamic-ui/display/List";
import { PricingCard } from "@/components/dynamic-ui/display/PricingCard";

// Navigation Components
import { Navbar } from "@/components/dynamic-ui/navigation/Navbar";
import { DropdownMenu } from "@/components/dynamic-ui/navigation/DropdownMenu";

// Media Components
import { Video } from "@/components/dynamic-ui/media/Video";
import { Carousel } from "@/components/dynamic-ui/media/Carousel";

// Feedback Components
import { Modal } from "@/components/dynamic-ui/feedback/Modal";
import { Alert } from "@/components/dynamic-ui/feedback/Alert";
import { Progress } from "@/components/dynamic-ui/feedback/Progress";
import { Spinner } from "@/components/dynamic-ui/feedback/Spinner";

// Section Components
import { HeroSection } from "@/components/dynamic-ui/sections/HeroSection";
import { FeatureSection } from "@/components/dynamic-ui/sections/FeatureSection";
import { CTASection } from "@/components/dynamic-ui/sections/CTASection";
import { FooterSection } from "@/components/dynamic-ui/sections/FooterSection";

/**
 * Core Component Registry (Complete - All Components)
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
    "split-pane": (props: any) => <Placeholder type="split-pane" props={props} />, // Retired
    "scroll-area": ScrollArea,
    section: (props: any) => <Placeholder type="section" props={props} />,
    tabs: Tabs,
    accordion: Accordion,
    "flex-container": (props: any) => <Placeholder type="flex-container" props={props} />,
    "resizable-panel": (props: any) => <Placeholder type="resizable-panel" props={props} />,

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
    "icon-button": (props: any) => <Placeholder type="icon-button" props={props} />,
    "button-group": (props: any) => <Placeholder type="button-group" props={props} />,
    fab: (props: any) => <Placeholder type="fab" props={props} />,

    // ─────────────────────────────
    // Forms
    // ─────────────────────────────
    form: Form,
    "form-group": FormGroup,
    label: Label,
    input: Input,
    select: Select,
    checkbox: Checkbox,
    radio: Radio,
    toggle: Toggle,
    slider: Slider,
    "file-upload": FileUpload,
    "date-picker": (props: any) => <Placeholder type="date-picker" props={props} />,
    textarea: Textarea,
    "color-picker": (props: any) => <Placeholder type="color-picker" props={props} />,
    rating: (props: any) => <Placeholder type="rating" props={props} />,
    "rich-text-editor": (props: any) => <Placeholder type="rich-text-editor" props={props} />,

    // ─────────────────────────────
    // Display
    // ─────────────────────────────
    card: Card,
    table: Table,
    "table-head": TableHead,
    "table-row": TableRow,
    "table-cell": TableCell,
    badge: Badge,
    list: List,
    "pricing-card": PricingCard,
    avatar: (props: any) => <Placeholder type="avatar" props={props} />,
    "data-grid": (props: any) => <Placeholder type="data-grid" props={props} />,
    "profile-card": (props: any) => <Placeholder type="profile-card" props={props} />,
    "article-card": (props: any) => <Placeholder type="article-card" props={props} />,

    // ─────────────────────────────
    // Navigation
    // ─────────────────────────────
    navbar: Navbar,
    "dropdown-menu": DropdownMenu,
    "mobile-menu": (props: any) => <Placeholder type="mobile-menu" props={props} />,
    breadcrumbs: (props: any) => <Placeholder type="breadcrumbs" props={props} />,
    sidebar: (props: any) => <Placeholder type="sidebar" props={props} />,
    pagination: (props: any) => <Placeholder type="pagination" props={props} />,

    // ─────────────────────────────
    // Media
    // ─────────────────────────────
    video: Video,
    carousel: Carousel,
    audio: (props: any) => <Placeholder type="audio" props={props} />,
    gallery: (props: any) => <Placeholder type="gallery" props={props} />,
    lightbox: (props: any) => <Placeholder type="lightbox" props={props} />,
    "background-video": (props: any) => <Placeholder type="background-video" props={props} />,
    iframe: (props: any) => <Placeholder type="iframe" props={props} />,

    // ─────────────────────────────
    // Feedback
    // ─────────────────────────────
    modal: Modal,
    alert: Alert,
    progress: Progress,
    spinner: Spinner,
    drawer: (props: any) => <Placeholder type="drawer" props={props} />,
    toast: (props: any) => <Placeholder type="toast" props={props} />,
    tooltip: (props: any) => <Placeholder type="tooltip" props={props} />,
    popover: (props: any) => <Placeholder type="popover" props={props} />,

    // ─────────────────────────────
    // Sections
    // ─────────────────────────────
    "hero-section": HeroSection,
    "feature-section": FeatureSection,
    "cta-section": CTASection,
    "footer-section": FooterSection,
    "testimonial-section": (props: any) => <Placeholder type="testimonial-section" props={props} />,

    // ─────────────────────────────
    // Advanced
    // ─────────────────────────────
    hero: (props: any) => <Placeholder type="hero" props={props} />,
    chart: (props: any) => <Placeholder type="chart" props={props} />,
    map: (props: any) => <Placeholder type="map" props={props} />,
    "code-editor": (props: any) => <Placeholder type="code-editor" props={props} />,
    repeater: (props: any) => <Placeholder type="repeater" props={props} />,
    conditional: (props: any) => <Placeholder type="conditional" props={props} />,
};

export default ComponentRegistry;
