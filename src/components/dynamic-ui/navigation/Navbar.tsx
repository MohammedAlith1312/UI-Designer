import React from 'react';

interface NavbarProps {
    logo?: string;
    logoText?: string;
    links?: Array<{ label: string; href: string; active?: boolean }>;
    actions?: React.ReactNode;
    sticky?: boolean;
    transparent?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// Augmented Navbar to support auto-fetching pages
export const Navbar: React.FC<NavbarProps & { autoLinks?: boolean }> = ({
    logo,
    logoText = 'Brand',
    links = [],
    actions,
    sticky = false,
    transparent = false,
    className,
    style,
    autoLinks = true
}) => {
    // State for auto-fetched pages
    const [dynamicLinks, setDynamicLinks] = React.useState<Array<{ label: string; href: string; active?: boolean }>>([]);

    React.useEffect(() => {
        if (autoLinks) {
            fetch('/api/dynamic-component')
                .then(res => res.json())
                .then(data => {
                    // Filter for pages only
                    const pages = data.filter((item: any) => item.category === 'page');
                    const navLinks = pages.map((page: any) => ({
                        label: page.name,
                        href: `#/preview?page=${page.id}`, // Using hash router or query param for now as per simple preview
                        active: false
                    }));
                    setDynamicLinks(navLinks);
                })
                .catch(err => console.error("Failed to fetch pages for navbar", err));
        }
    }, [autoLinks]);

    // Merge manual links with dynamic ones, or just use dynamic if available
    const displayLinks = autoLinks && dynamicLinks.length > 0 ? dynamicLinks : links;

    return (
        <nav
            style={style}
            className={`
            ${sticky ? 'sticky top-0 z-50' : ''}
            transition-all duration-300
            ${transparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md border-b border-zinc-200/50 shadow-sm supports-[backdrop-filter]:bg-white/60'}
            ${className || ''}
        `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer group">
                        {logo ? (
                            <img src={logo} alt={logoText} className="h-9 w-auto transition-transform group-hover:scale-105" />
                        ) : (
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <span className="font-bold text-lg">B</span>
                            </div>
                        )}
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600">
                            {logoText}
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center bg-zinc-100/50 p-1.5 rounded-full border border-zinc-200/50">
                        {displayLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className={`
                                    text-sm font-medium px-5 py-2 rounded-full transition-all duration-200
                                    ${link.active
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/50'}
                                `}
                            >
                                {link.label}
                            </a>
                        ))}
                        {displayLinks.length === 0 && (
                            <span className="text-xs text-zinc-400 italic px-4">No pages found</span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {actions ? actions : (
                            <button className="px-6 py-2.5 text-sm font-semibold text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10 hover:shadow-zinc-900/20 active:scale-95">
                                Get Started
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};
