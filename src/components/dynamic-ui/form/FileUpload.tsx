import React, { useState } from 'react';

interface FileUploadProps {
    label?: string;
    accept?: string;
    multiple?: boolean;
    maxSize?: number; // in MB
    onChange?: (files: File[]) => void;
    className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    label = 'Upload Files',
    accept,
    multiple = false,
    maxSize = 10,
    onChange,
    className
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;

        const newFiles = Array.from(fileList).filter(file => {
            const sizeMB = file.size / (1024 * 1024);
            return sizeMB <= maxSize;
        });

        setFiles(multiple ? [...files, ...newFiles] : newFiles);
        onChange?.(newFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onChange?.(newFiles);
    };

    return (
        <div className={`space-y-4 ${className || ''}`}>
            {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}

            {/* Drop Zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFiles(e.dataTransfer.files);
                }}
                className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-zinc-300 hover:border-zinc-400'}
                `}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    id="file-upload"
                />

                <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 mx-auto mb-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-zinc-600 mb-1">
                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-400">Max file size: {maxSize}MB</p>
                </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-zinc-700">{file.name}</p>
                                    <p className="text-xs text-zinc-400">{(file.size / 1024).toFixed(1)} KB</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFile(idx)}
                                className="p-1 hover:bg-zinc-200 rounded transition-colors"
                            >
                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
