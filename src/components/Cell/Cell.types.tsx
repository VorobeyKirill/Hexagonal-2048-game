export interface CellProps {
    cellData: {
        x: number;
        y: number;
        z: number;
        value: number;
    },
    size: number;
    boardRadius: number;
}