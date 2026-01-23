import React from 'react';

const alignMap: Record<string, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

const colMap: Record<number, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
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
    gap = 4,
    align = "start",
    width = "full",
    padding = 0,
    margin = 0,
}) => (
    <div
        className={[
            "grid",
            "grid-cols-1",
            colMap[cols],
            gapMap[gap],
            alignMap[align],
            widthMap[width],
            paddingMap[padding],
            marginMap[margin],
        ].join(" ")}
    >
        {children}
    </div>
);
