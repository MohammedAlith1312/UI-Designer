import React from 'react';

export const Text: React.FC<any> = ({ text, className, style }: any) => (
    <p className={`text-zinc-600 leading-relaxed ${className || ''}`} style={style}>{text}</p>
);
