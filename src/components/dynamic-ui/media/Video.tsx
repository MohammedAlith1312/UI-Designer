import React from 'react';

interface VideoProps {
    src?: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}

export const Video: React.FC<VideoProps> = ({
    src,
    poster,
    autoplay = false,
    loop = false,
    muted = false,
    controls = true,
    className
}) => {
    return (
        <div className={`relative w-full overflow-hidden rounded-lg ${className || ''}`}>
            {src ? (
                <video
                    src={src}
                    poster={poster}
                    autoPlay={autoplay}
                    loop={loop}
                    muted={muted}
                    controls={controls}
                    className="w-full h-full object-cover"
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="bg-zinc-100 w-full h-64 flex items-center justify-center text-zinc-400">
                    <div className="text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">No video source</p>
                    </div>
                </div>
            )}
        </div>
    );
};
