import { BOARD_WIDTH } from "../constants";
import { CellCoordinates } from "../types.global";

export const useBoardGrid = (radius: number) => {
    const getGridCellsCoords = (): CellCoordinates[] => {
        const cellsCoordsArray = [];
        const maxCoordValue = radius - 1;

        for (let x = -maxCoordValue; x <= maxCoordValue; x += 1) {
        if (x <= 0) {
            for (let y = maxCoordValue; y >= -maxCoordValue + Math.abs(x); y -= 1) {
            const z = -y - x || 0;

            cellsCoordsArray.push({ x, y, z });
            }
        } else {
            for (let y = maxCoordValue - x; y >= -maxCoordValue; y -= 1) {
            const z = -y - x || 0;

            cellsCoordsArray.push({ x, y, z });
            }
        }
        }
        return cellsCoordsArray;
    };

    const getGridCellSize = (): number => {
        return BOARD_WIDTH / (3 * radius - 1);
    };

    return { getGridCellsCoords, getGridCellSize };
};
