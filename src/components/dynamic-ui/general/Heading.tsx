import React from 'react';

export const Heading: React.FC<any> = ({ text, level = 1, className, style }: any) => {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    const styleMap: Record<number, string> = {
        1: "text-4xl font-extrabold tracking-tight",
        2: "text-3xl font-bold tracking-tight",
        3: "text-2xl font-semibold",
        4: "text-xl font-medium",
        5: "text-lg font-semibold",
        6: "text-base font-medium",
    };
    const styles = styleMap[level] || "text-lg font-medium";

    return <Tag className={`${styles} ${className || ""}`} style={style}>{text}</Tag>;
};
