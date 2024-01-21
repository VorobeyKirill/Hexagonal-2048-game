export enum BOARD_RADIUS {
    MIN = 2,
    MAX = 6
}

export interface CellCoordinates {
    x: number;
    y: number;
    z: number;
}

export interface CellData extends CellCoordinates {
    value: number;
}

export interface MovingCellData extends CellData {
    new?: boolean;
}