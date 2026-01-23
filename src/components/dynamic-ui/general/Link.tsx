import React from 'react';

export const Link: React.FC<any> = ({ text, href = "#", className }: any) => {
    return (
        <a
            href={href}
            className={`text-blue-600 hover:text-blue-800 underline transition-colors cursor-pointer ${className || ''}`}
            onClick={(e) => {
                if (href === "#") e.preventDefault();
            }}
        >
            {text || "Link"}
        </a>
    );
};
