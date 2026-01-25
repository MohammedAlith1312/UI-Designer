import React from 'react';

export const Label: React.FC<any> = ({
    children,
    htmlFor,
    required = false,
    className,
    style
}) => (
    <label
        htmlFor={htmlFor}
        className={`block text-sm font-medium text-zinc-700 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-md ${className || ""}`}
        style={style}
    >
        {children || "Label Text"}
        {required && <span className="text-red-500 ml-1">*</span>}
    </label>
);
