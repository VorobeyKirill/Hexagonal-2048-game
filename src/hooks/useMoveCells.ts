import { Dispatch, useCallback, useEffect } from "react";
import { CellData, GridAxis, MovingCellData } from "../types.global";
import { mergeCellsArrays } from "../utils/mergeCellsArrays";

export const useMoveCells = (
    gameCells: CellData[],
    setGameCells: Dispatch<React.SetStateAction<CellData[]>>,
    setIsMoveDone: Dispatch<React.SetStateAction<boolean>>
): void => {
    const getCellsFromAxis = useCallback((axis: GridAxis): { [key: number]: MovingCellData[] } => {
        const cellsFromAxis: { [key: number]: MovingCellData[] } = {};

        gameCells.forEach(cell => {
            if (cellsFromAxis[cell[axis]]) {
                cellsFromAxis[cell[axis]].push(cell);
            } else {
                cellsFromAxis[cell[axis]] = [cell];
            }
        });

        return cellsFromAxis;
    }, [gameCells]);

    const applyGameCellsChanges = useCallback((newCells: MovingCellData[]): void => {
        setGameCells(mergeCellsArrays(gameCells, newCells));
    }, [setGameCells]);

    const moveCells = useCallback((axis: GridAxis, reverse: boolean): void => {
        let isMoveDone = false;
        const cellsFromAxis = getCellsFromAxis(axis);

        for (let [axisValue, cellsVector] of Object.entries(cellsFromAxis)) {
            if (reverse) {
                cellsVector.reverse();
            }

            for (let i = 1; i < cellsVector.length; i += 1) {
                if (cellsVector[i].value === 0) {
                    continue;
                }

                for (let j = i - 1; j >= 0; j -= 1) {
                    if (cellsVector[j].new) {
                        continue;
                    }

                    if (cellsVector[j].value === 0) {
                        const temp = cellsVector[j + 1].value;
                        cellsVector[j + 1].value = 0;
                        cellsVector[j + 1].new = false;
                        cellsVector[j].value = temp;

                        isMoveDone = true;

                        continue;
                    }

                    if (cellsVector[j].value === cellsVector[j + 1].value) {
                        cellsVector[j].value *= 2;
                        cellsVector[j].new = true;
                        cellsVector[j + 1].value = 0;

                        isMoveDone = true;
                    }
                }
            }
        }

        applyGameCellsChanges([...Object.values(cellsFromAxis)].flat());
        if (isMoveDone) {
            setIsMoveDone(prevState => !prevState);
        }
    }, [getCellsFromAxis, setIsMoveDone]);

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        event.preventDefault();

        if (!['q', 'a', 'w', 's', 'e', 'd'].includes(event.key)) {
            return;
        }

        switch(event.key) {
            case 'q':
                moveCells('z', false);
                break;
            case 'd':
                moveCells('z', true);
                break;
            case 'w':
                moveCells('x', false);
                break;
            case 's':
                moveCells('x', true);
                break;
            case 'e':
                moveCells('y', true);
                break;
            case 'a':
                moveCells('y', false);
                break;
        }
    }, [moveCells]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, [handleKeydown]);
}