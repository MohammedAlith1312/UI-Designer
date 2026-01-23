import React from 'react';

interface FeatureSectionProps {
    title?: string;
    subtitle?: string;
    features?: Array<{
        icon?: string;
        title: string;
        description: string;
    }>;
    columns?: 2 | 3 | 4;
    className?: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
    title = 'Features',
    subtitle = 'Everything you need to succeed',
    features = [],
    columns = 3,
    className
}) => {
    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <section className={`py-20 bg-white ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">{title}</h2>
                    <p className="text-xl text-zinc-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                {/* Features Grid */}
                <div className={`grid ${gridCols[columns]} gap-8`}>
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-8 rounded-xl border border-zinc-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300"
                        >
                            {feature.icon && (
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                    <span className="text-2xl group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </span>
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-zinc-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {features.length === 0 && (
                    <div className="text-center py-12 text-zinc-400">
                        <p>No features added yet</p>
                    </div>
                )}
            </div>
        </section>
    );
};
