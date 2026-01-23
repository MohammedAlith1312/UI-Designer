import React from 'react';

interface FooterSectionProps {
    logo?: string;
    logoText?: string;
    description?: string;
    columns?: Array<{
        title: string;
        links: Array<{ label: string; href: string }>;
    }>;
    socialLinks?: Array<{
        platform: string;
        href: string;
        icon?: string;
    }>;
    copyright?: string;
    className?: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
    logo,
    logoText = 'Brand',
    description = 'Building amazing digital experiences',
    columns = [],
    socialLinks = [],
    copyright,
    className
}) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-zinc-900 text-white ${className || ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            {logo && <img src={logo} alt={logoText} className="h-8 w-auto" />}
                            <span className="text-xl font-bold">{logoText}</span>
                        </div>
                        <p className="text-zinc-400 mb-6 max-w-sm">{description}</p>

                        {/* Social Links */}
                        {socialLinks.length > 0 && (
                            <div className="flex gap-4">
                                {socialLinks.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center transition-colors"
                                        aria-label={social.platform}
                                    >
                                        {social.icon || social.platform.charAt(0)}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Link Columns */}
                    {columns.map((column, idx) => (
                        <div key={idx}>
                            <h3 className="font-semibold mb-4">{column.title}</h3>
                            <ul className="space-y-3">
                                {column.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <a
                                            href={link.href}
                                            className="text-zinc-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800">
                    <p className="text-center text-zinc-400 text-sm">
                        {copyright || `© ${currentYear} ${logoText}. All rights reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    );
};
