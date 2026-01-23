import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'border' | 'dots' | 'pulse';
    color?: string;
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'md',
    variant = 'border',
    color = 'text-blue-600',
    className
}) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    if (variant === 'border') {
        return (
            <div className={`${sizes[size]} ${className || ''}`}>
                <div className={`
                    ${sizes[size]} ${color}
                    border-4 border-current border-t-transparent
                    rounded-full animate-spin
                `} />
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className={`flex gap-2 ${className || ''}`}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`
                            ${sizes[size]} ${color} bg-current rounded-full
                            animate-bounce
                        `}
                        style={{ animationDelay: `${i * 0.15}s` }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={`${sizes[size]} ${color} ${className || ''}`}>
            <div className={`${sizes[size]} bg-current rounded-full animate-ping opacity-75`} />
        </div>
    );
};
