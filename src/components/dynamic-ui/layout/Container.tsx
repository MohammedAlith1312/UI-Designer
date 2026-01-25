import React from 'react';

const maxWidthMap: Record<string, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "4xl": "max-w-4xl",
    "7xl": "max-w-7xl",
};

const paddingMap: Record<number, string> = {
    0: "p-0",
    2: "p-2",
    4: "p-4",
    6: "p-6",
    8: "p-8",
    10: "p-10",
};

export const Container: React.FC<any> = ({
    children,
    maxWidth = "7xl",
    padding = 4,
    className,
    style
}) => (
    <div
        className={`${maxWidthMap[maxWidth]} mx-auto ${paddingMap[padding]} ${className || ''}`}
        style={style}
    >
        {children}
    </div>
);
