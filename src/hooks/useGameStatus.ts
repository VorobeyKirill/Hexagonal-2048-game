import { Dispatch, useCallback, useEffect } from "react";
import { CellData, GameStatus } from "../types.global";

export const useGameStatus = (gameCells: CellData[], setGameStatus: Dispatch<React.SetStateAction<GameStatus>>): void => {
    const getCellNeighbours = useCallback((cell: CellData): CellData[] => {
        const cellNeighbours: CellData[] = [];

        gameCells.forEach(gameCell => {
            if (
                (gameCell.y === cell.y - 1 && gameCell.z === cell.z + 1) || // Check bottom
                (gameCell.y === cell.y + 1 && gameCell.z === cell.z - 1) || // Check top
                (gameCell.x === cell.x + 1 && gameCell.z === cell.z - 1) || // Check top-right
                (gameCell.y === cell.x - 1 && gameCell.z === cell.z + 1) || // Check bottom-left
                (gameCell.y === cell.y + 1 && gameCell.x === cell.x - 1) || // Check top-left
                (gameCell.y === cell.y - 1 && gameCell.x === cell.x + 1) // Check bottom-right
            ) {
                cellNeighbours.push(gameCell);
            }
        });

        return cellNeighbours;
    }, [gameCells]);


    const getGameStatus = useCallback((): GameStatus => {
        for (let  i = 0; i < gameCells.length; i += 1) {
            if (gameCells[i].value === 0) {
                return 'playing';
            }

            const cellNeighbours = getCellNeighbours(gameCells[i]);

            const isMovesAvailable = cellNeighbours.some(neighbour => neighbour.value === 0 || neighbour.value === gameCells[i].value);

            if (isMovesAvailable) {
                return 'playing';
            }
        }

        return 'game-over';
    }, [getCellNeighbours, gameCells]);

    useEffect(() => {
        setGameStatus(getGameStatus());
    }, [gameCells, setGameStatus, getGameStatus])
}