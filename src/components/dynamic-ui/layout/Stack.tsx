import React from 'react';

const alignMap: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

const justifyMap: Record<string, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
};

const flexDirMap: Record<string, string> = {
    row: "flex-row",
    col: "flex-col",
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

export const Stack: React.FC<any> = ({
    children,
    direction = "col",
    gap = 4,
    align = "start",
    justify = "start",
    width = "full",
    padding = 0,
    margin = 0,
}) => (
    <div
        className={[
            "flex",
            flexDirMap[direction],
            gapMap[gap],
            alignMap[align],
            justifyMap[justify],
            widthMap[width],
            paddingMap[padding],
            marginMap[margin],
        ].join(" ")}
    >
        {children}
    </div>
);
