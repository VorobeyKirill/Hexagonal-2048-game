import { Dispatch, useCallback, useEffect, useState } from "react";
import { CellData, GridAxis, MovingCellData } from "../types.global";
import { mergeCellsArrays } from "../utils/mergeCellsArrays";

export const useMoveCells = (
    gameCells: CellData[],
    setGameCells: Dispatch<React.SetStateAction<CellData[]>>,
    setIsMoveDone: Dispatch<React.SetStateAction<boolean>>
): void => {
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    // Function to store cells with the same moving axis value in vectors
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
        for (let cellsVector of Object.values(cellsFromAxis)) {
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

                    if (cellsVector[j].value === cellsVector[j + 1].value && !cellsVector[j + 1].new) {
                        cellsVector[j].value *= 2;
                        cellsVector[j].new = true; // Additional field to mark whether a cell has been summed with another cell and can no longer be summed during this move
                        cellsVector[j + 1].value = 0;

                        isMoveDone = true; // Flag to observe whether we should request new filled cells (if any move has been made)
                    }
                }
            }

            for (let i = 0; i < cellsVector.length; i += 1) {
                cellsVector[i].new = false;
            }
        }

        if (isMoveDone) {
            applyGameCellsChanges([...Object.values(cellsFromAxis)].flat());
            setIsMoveDone(prevState => !prevState);
        }
    }, [getCellsFromAxis, setIsMoveDone]);

    const handleKeydown = useCallback((event: KeyboardEvent) => {
        event.preventDefault();

        if (!['q', 'a', 'w', 's', 'e', 'd'].includes(event.key) || isKeyPressed) {
            return;
        }

        setIsKeyPressed(true);

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
    }, [moveCells, isKeyPressed]);

    // Additional keyup handler is needed to prevent 'race condition' bug, when the user presses too many keys too quickly
    const handleKeyup = useCallback((event: KeyboardEvent) => {
        if (!['q', 'a', 'w', 's', 'e', 'd'].includes(event.key)) {
            return;
        }

        setIsKeyPressed(false);
    }, [setIsKeyPressed]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyup);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('keyup', handleKeyup);
        }
    }, [handleKeydown, handleKeyup]);
}