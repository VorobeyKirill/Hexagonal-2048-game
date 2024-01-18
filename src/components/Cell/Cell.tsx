import { FC } from "react";

interface CellProps {
    x: number;
    y: number;
    z: number;
    value: number;
}

export const Cell: FC<CellProps> = ({ x, y, z, value }) => {
    return (
        <div
            className="cell"
            data-x={x}
            data-y={y}
            data-z={z}
            data-value={value}
        >
            {!!value && <span>{value}</span>}
        </div>
    )
}