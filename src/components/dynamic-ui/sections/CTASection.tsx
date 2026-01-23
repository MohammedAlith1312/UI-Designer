import React from 'react';

interface CTASectionProps {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    variant?: 'default' | 'gradient' | 'bordered';
    className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
    title = 'Ready to get started?',
    description = 'Join thousands of users already using our platform',
    buttonText = 'Get Started',
    buttonHref = '#',
    secondaryButtonText,
    secondaryButtonHref = '#',
    variant = 'default',
    className
}) => {
    const variants = {
        default: 'bg-blue-600',
        gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
        bordered: 'bg-white border-2 border-blue-600'
    };

    const textColor = variant === 'bordered' ? 'text-zinc-900' : 'text-white';
    const descColor = variant === 'bordered' ? 'text-zinc-600' : 'text-white/90';

    return (
        <section className={`py-20 ${variants[variant]} ${className || ''}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className={`text-4xl lg:text-5xl font-bold ${textColor} mb-6`}>
                    {title}
                </h2>
                <p className={`text-xl ${descColor} mb-10 max-w-2xl mx-auto`}>
                    {description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <a
                        href={buttonHref}
                        className={`
                            px-8 py-4 font-semibold rounded-lg transition-all shadow-lg
                            ${variant === 'bordered'
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-white text-blue-600 hover:bg-blue-50'}
                        `}
                    >
                        {buttonText}
                    </a>
                    {secondaryButtonText && (
                        <a
                            href={secondaryButtonHref}
                            className={`
                                px-8 py-4 font-semibold rounded-lg transition-all
                                ${variant === 'bordered'
                                    ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                                    : 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm'}
                            `}
                        >
                            {secondaryButtonText}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};
