import React, { useState } from 'react';

interface CarouselProps {
    items?: Array<{
        image?: string;
        title?: string;
        description?: string;
    }>;
    autoplay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
    items = [],
    autoplay = false,
    interval = 3000,
    showDots = true,
    showArrows = true,
    className
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    React.useEffect(() => {
        if (autoplay && items.length > 0) {
            const timer = setInterval(goToNext, interval);
            return () => clearInterval(timer);
        }
    }, [autoplay, interval, currentIndex]);

    if (items.length === 0) {
        return (
            <div className="bg-zinc-100 w-full h-96 flex items-center justify-center text-zinc-400 rounded-lg">
                <p>No carousel items</p>
            </div>
        );
    }

    return (
        <div className={`relative w-full overflow-hidden rounded-lg ${className || ''}`}>
            {/* Slides */}
            <div className="relative h-96">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.title || `Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {(item.title || item.description) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                                {item.title && (
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                )}
                                {item.description && (
                                    <p className="text-white/90">{item.description}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Arrows */}
            {showArrows && items.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots */}
            {showDots && items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
