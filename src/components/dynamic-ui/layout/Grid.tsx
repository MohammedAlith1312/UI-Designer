import React from 'react';

const alignMap: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

const colMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
};

const gapMap: Record<number, string> = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
};

const widthMap: Record<string, string> = {
    full: "w-full",
    half: "w-1/2",
    third: "w-1/3",
    quarter: "w-1/4",
};

const paddingMap: Record<number, string> = {
    0: "p-0",
    2: "p-2",
    4: "p-4",
    6: "p-6",
    8: "p-8",
    10: "p-10",
};

const marginMap: Record<number, string> = {
    0: "m-0",
    2: "m-2",
    4: "m-4",
    6: "m-6",
    8: "m-8",
    10: "m-10",
};

export const Grid: React.FC<any> = ({
    children,
    cols = 2,
    rows,
    gap = 4,
    align = "start",
    width = "full",
    padding = 0,
    margin = 0,
    className,
    style,
    rowStructure
}) => {
    // If rowStructure is defined, use it; otherwise fall back to uniform grid
    if (rowStructure && Object.keys(rowStructure).length > 0) {
        const childArray = React.Children.toArray(children);
        let childIndex = 0;

        return (
            <div
                className={[
                    "flex flex-col",
                    gapMap[gap],
                    widthMap[width],
                    paddingMap[padding],
                    marginMap[margin],
                    className || ""
                ].join(" ")}
                style={style}
            >
                {Object.entries(rowStructure)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([rowIdx, colCount]: [string, any]) => {
                        const numCols = parseInt(String(colCount)) || 0;
                        if (numCols <= 0) return null;

                        const rowChildren = [];
                        for (let i = 0; i < numCols; i++) {
                            const child = childArray[childIndex];
                            if (child) {
                                rowChildren.push(child);
                            } else {
                                // Add placeholder for empty cells
                                rowChildren.push(
                                    <div
                                        key={`placeholder-${rowIdx}-${i}`}
                                        className="min-h-24 border-2 border-dashed border-zinc-300 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400 text-xs"
                                    >
                                        <div className="text-center">
                                            <div className="font-mono text-[10px]">R{parseInt(rowIdx) + 1}C{i + 1}</div>
                                            <div className="text-[9px] mt-1">Empty Cell</div>
                                        </div>
                                    </div>
                                );
                            }
                            childIndex++;
                        }

                        return (
                            <div
                                key={rowIdx}
                                className={[
                                    "grid",
                                    colMap[numCols] || "grid-cols-1",
                                    gapMap[gap],
                                    alignMap[align]
                                ].join(" ")}
                            >
                                {rowChildren}
                            </div>
                        );
                    })}
            </div>
        );
    }

    // Fallback to uniform grid
    const gridStyle = {
        ...style,
        ...(rows && { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` })
    };

    return (
        <div
            className={[
                "grid",
                colMap[cols],
                gapMap[gap],
                alignMap[align],
                widthMap[width],
                paddingMap[padding],
                marginMap[margin],
                className || ""
            ].join(" ")}
            style={gridStyle}
        >
            {children}
        </div>
    );
};
