import React from 'react';

export const Accordion: React.FC<any> = (props) => {
    return (
        <div className="w-full border border-gray-200 rounded-lg bg-white divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
                <div key={i} className="group">
                    <div className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                        <span className="font-medium text-gray-700">Accordion Item {i}</span>
                        <span className="text-gray-400">▼</span>
                    </div>
                    {i === 1 && (
                        <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600">
                            This is the content for item {i}. In a real implementation, this would be toggleable.
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
