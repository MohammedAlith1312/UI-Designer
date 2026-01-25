import React from 'react';
import { Placeholder } from '../Placeholder';

export const Tabs: React.FC<any> = (props) => {
    return (
        <div className="w-full border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex border-b border-gray-200 mb-4">
                <div className="px-4 py-2 border-b-2 border-indigo-500 font-medium text-indigo-600">Tab 1</div>
                <div className="px-4 py-2 text-gray-500 hover:text-gray-700">Tab 2</div>
                <div className="px-4 py-2 text-gray-500 hover:text-gray-700">Tab 3</div>
            </div>
            <div className="p-4 bg-gray-50 rounded border border-dashed border-gray-200 min-h-[100px] flex items-center justify-center text-gray-400">
                Tab 1 Content Area
            </div>
        </div>
    );
};
