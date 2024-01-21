import { Dispatch, useCallback, useEffect } from "react";
import { CellData, GameStatus } from "../types.global";

export const useGameStatus = (gameCells: CellData[], setGameStatus: Dispatch<React.SetStateAction<GameStatus>>): void => {
    const checkSameValueCellNeighbours = useCallback((cell: CellData): boolean => {
        let isSameValueNeighbour = false;

        gameCells.forEach(gameCell => {
            if (
                (gameCell.y === cell.y - 1 && gameCell.z === cell.z + 1) || // Check bottom
                (gameCell.y === cell.y + 1 && gameCell.z === cell.z - 1) || // Check top
                (gameCell.x === cell.x + 1 && gameCell.z === cell.z - 1) || // Check top-right
                (gameCell.x === cell.x - 1 && gameCell.z === cell.z + 1) || // Check bottom-left
                (gameCell.y === cell.y + 1 && gameCell.x === cell.x - 1) || // Check top-left
                (gameCell.y === cell.y - 1 && gameCell.x === cell.x + 1) // Check bottom-right
            ) {
                if (gameCell.value === cell.value) {
                    isSameValueNeighbour =  true;
                }
            }
        });

        return isSameValueNeighbour;
    }, [gameCells]);


    const getGameStatus = useCallback((): GameStatus => {
        for (let  i = 0; i < gameCells.length; i += 1) {
            if (gameCells[i].value === 0) {
                return 'playing';
            }

            const isMovesAvailable = checkSameValueCellNeighbours(gameCells[i]);

            if (isMovesAvailable) {
                return 'playing';
            }
        }

        return 'game-over';
    }, [checkSameValueCellNeighbours, gameCells]);

    useEffect(() => {
        setGameStatus(getGameStatus());
    }, [gameCells, setGameStatus, getGameStatus])
}