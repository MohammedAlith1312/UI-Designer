import React from 'react';

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    primaryButton?: { text: string; href?: string };
    secondaryButton?: { text: string; href?: string };
    image?: string;
    backgroundImage?: string;
    variant?: 'centered' | 'split' | 'minimal';
    className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    title = 'Welcome to Our Platform',
    subtitle,
    description = 'Build amazing things with our powerful tools',
    primaryButton,
    secondaryButton,
    image,
    backgroundImage,
    variant = 'centered',
    className
}) => {
    if (variant === 'split') {
        return (
            <section className={`relative overflow-hidden ${className || ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            {subtitle && (
                                <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
                                    {subtitle}
                                </p>
                            )}
                            <h1 className="text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl text-zinc-600 leading-relaxed">
                                {description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {primaryButton && (
                                    <a
                                        href={primaryButton.href || '#'}
                                        className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                                    >
                                        {primaryButton.text}
                                    </a>
                                )}
                                {secondaryButton && (
                                    <a
                                        href={secondaryButton.href || '#'}
                                        className="px-8 py-4 bg-white text-zinc-900 font-semibold rounded-lg border-2 border-zinc-200 hover:border-zinc-300 transition-colors"
                                    >
                                        {secondaryButton.text}
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            {image ? (
                                <img
                                    src={image}
                                    alt="Hero"
                                    className="w-full h-auto rounded-2xl shadow-2xl"
                                />
                            ) : (
                                <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl" />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (variant === 'minimal') {
        return (
            <section className={`relative overflow-hidden bg-white ${className || ''}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                    {subtitle && (
                        <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm mb-4">
                            {subtitle}
                        </p>
                    )}
                    <h1 className="text-6xl lg:text-7xl font-bold text-zinc-900 leading-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-xl text-zinc-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {primaryButton && (
                            <a
                                href={primaryButton.href || '#'}
                                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {primaryButton.text}
                            </a>
                        )}
                        {secondaryButton && (
                            <a
                                href={secondaryButton.href || '#'}
                                className="px-8 py-4 text-zinc-600 font-semibold hover:text-zinc-900 transition-colors"
                            >
                                {secondaryButton.text}
                            </a>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Centered variant (default)
    return (
        <section
            className={`relative overflow-hidden ${className || ''}`}
            style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            } : {}}
        >
            <div className={`${backgroundImage ? 'bg-black/50' : 'bg-gradient-to-br from-blue-600 to-purple-700'}`}>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                    {subtitle && (
                        <p className="text-blue-200 font-semibold uppercase tracking-wide text-sm mb-4">
                            {subtitle}
                        </p>
                    )}
                    <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {primaryButton && (
                            <a
                                href={primaryButton.href || '#'}
                                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-xl"
                            >
                                {primaryButton.text}
                            </a>
                        )}
                        {secondaryButton && (
                            <a
                                href={secondaryButton.href || '#'}
                                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors backdrop-blur-sm"
                            >
                                {secondaryButton.text}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
