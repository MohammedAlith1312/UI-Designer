import React from 'react';

interface PricingCardProps {
    name?: string;
    price?: string | number;
    period?: string;
    description?: string;
    features?: string[];
    buttonText?: string;
    buttonVariant?: 'primary' | 'secondary';
    popular?: boolean;
    className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    name = 'Plan Name',
    price = 0,
    period = '/month',
    description,
    features = [],
    buttonText = 'Get Started',
    buttonVariant = 'primary',
    popular = false,
    className
}) => {
    return (
        <div className={`
            relative bg-white border rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow
            ${popular ? 'border-blue-500 ring-2 ring-blue-500' : 'border-zinc-200'}
            ${className || ''}
        `}>
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                </div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{name}</h3>
                {description && (
                    <p className="text-sm text-zinc-500">{description}</p>
                )}
            </div>

            <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-zinc-900">${price}</span>
                    <span className="text-zinc-500">{period}</span>
                </div>
            </div>

            <ul className="space-y-3 mb-8">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-zinc-600">{feature}</span>
                    </li>
                ))}
            </ul>

            <button className={`
                w-full py-3 px-6 rounded-lg font-semibold transition-colors
                ${buttonVariant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}
            `}>
                {buttonText}
            </button>
        </div>
    );
};
