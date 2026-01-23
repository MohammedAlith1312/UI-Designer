import React from 'react';

interface NavbarProps {
    logo?: string;
    logoText?: string;
    links?: Array<{ label: string; href: string; active?: boolean }>;
    actions?: React.ReactNode;
    sticky?: boolean;
    transparent?: boolean;
    className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
    logo,
    logoText = 'Brand',
    links = [],
    actions,
    sticky = false,
    transparent = false,
    className
}) => {
    return (
        <nav className={`
            ${sticky ? 'sticky top-0 z-50' : ''}
            ${transparent ? 'bg-transparent' : 'bg-white border-b border-zinc-200'}
            ${className || ''}
        `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        {logo && <img src={logo} alt={logoText} className="h-8 w-auto" />}
                        <span className="text-xl font-bold text-zinc-900">{logoText}</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className={`
                                    text-sm font-medium transition-colors
                                    ${link.active
                                        ? 'text-blue-600'
                                        : 'text-zinc-600 hover:text-zinc-900'}
                                `}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    {actions && (
                        <div className="flex items-center gap-4">
                            {actions}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-zinc-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};
