import { FC } from "react";

import "./Cell.scss";

interface CellProps {
    cellData: {
        x: number;
        y: number;
        z: number;
        value: number;
    },
    size: number;
    boardRadius: number;
}

export const Cell: FC<CellProps> = ({ cellData, size, boardRadius }) => {
    const {x, y, z, value } = cellData;

    const cellWidth = size * 2;
    const cellHeight = size * Math.sqrt(3);

    const topOffset = size * Math.sqrt(3) * -(x / 2 + y) + (boardRadius - 1) * size * Math.sqrt(3);
    const leftOffset = size * 3 / 2 * x + Math.sqrt(3) * (boardRadius - 1) * size * Math.sqrt(3) / 2 - 8 * x;

    return (
        <div
            style={{
                width: `${cellWidth}px`,
                height: `${cellHeight}px`,
                top: `${topOffset}px`,
                left: `${leftOffset}px`
            }}
            className="cell"
            data-x={x}
            data-y={y}
            data-z={z}
            data-value={value}
        >
            {!!value && <span>{value}</span>}
        </div>
    );
}