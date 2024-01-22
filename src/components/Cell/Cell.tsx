import { FC } from "react";
import { CELL_BORDER_WIDTH } from "../../constants";

import "./Cell.scss";
import { useScale } from "../../hooks/useScale";
import { CellProps } from "./Cell.types";

export const Cell: FC<CellProps> = ({ cellData, size, boardRadius }) => {
    const {x, y, z, value } = cellData;

    const scaleValue = useScale(value);

    const cellWidth = size * 2;
    const cellHeight = size * Math.sqrt(3);

    const leftOffset = size * 1.5 * x + Math.sqrt(3) * (boardRadius - 1) * cellHeight / 2 - CELL_BORDER_WIDTH * x;
    const topOffset = -cellHeight / 2 * (1 + x + 2 * y) + CELL_BORDER_WIDTH * y + CELL_BORDER_WIDTH * x / Math.sqrt(3) + boardRadius * cellHeight * 1.5 / Math.sqrt(3);

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
            data-testid="cell"
        >
            <div
                className="cell__tile"
                data-testid="cell-tile"
                style={{
                    width: `${cellWidth - CELL_BORDER_WIDTH * 4 + boardRadius}px`,
                    height: `${cellHeight - CELL_BORDER_WIDTH * 4 + boardRadius}px`,
                    top: `${CELL_BORDER_WIDTH * 2 - boardRadius / 2}px`,
                    left: `${CELL_BORDER_WIDTH * 2 - boardRadius / 2}px`,
                    transform: `scale(${scaleValue})`
                }}
                data-cell-value={value}
            >
                {!!value && <span>{value}</span>}
            </div>
        </div>
    );
}