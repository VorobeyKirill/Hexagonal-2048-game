import { CellData } from "../types.global";

export const mergeCellsArrays = (baseCellsArray: CellData[], newCellsArray: CellData[]): CellData[] => {
    if (newCellsArray.length === 0) {
        return baseCellsArray;
    }

    const mergedArray = baseCellsArray.map(cell => {
        const cellToMerge = newCellsArray.find(newCell => (
            newCell.x === cell.x && newCell.y === cell.y && newCell.z === cell.z
        ));

        if (!cellToMerge) {
            return cell;
        }

        return {
            ...cell,
            value: cellToMerge.value,
        }
    });

    return mergedArray;
}