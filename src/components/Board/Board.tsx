import { FC, useEffect, useState } from "react";
import { BoardProps } from "./Board.types";
import { Cell } from "../Cell/Cell";
import { CellData, GameStatus } from "../../types.global";
import { BOARD_WIDTH } from "../../constants";
import { mergeCellsArrays } from "../../utils/mergeCellsArrays";
import { useMoveCells } from "../../hooks/useMoveCells";
import { useGameStatus } from "../../hooks/useGameStatus";
import { useBoardGrid } from "../../hooks/useBoardGrid";

import "./Board.scss";

export const Board: FC<BoardProps> = ({ radius, hostname, port }) => {
    // Hook for all methods related to the coordinates of cells in the grid and their size
    const { getGridCellsCoords, getGridCellSize } = useBoardGrid(radius);

    // Flag to observe whether we should request new filled cells (if any move has been made)
    const [isMoveDone, setIsMoveDone] = useState(false);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');

    // Setting all cells with their coordinates and zero value by default
    const [gameCells, setGameCells] = useState<CellData[]>(() => {
        return getGridCellsCoords().map(cellCoord => (
            {
                ...cellCoord,
                value: 0,
            }
        ));
    });

    // Hook for checking gameStatus after each move (gameCells array change)
    useGameStatus(gameCells, setGameStatus);

    // Hook for handling keyboard events and moving values in cells
    useMoveCells(gameCells, setGameCells, setIsMoveDone);

    // useEffect to request new random filled cells from the server
    useEffect(() => {
        const requestNewFilledCells = async () => {
            const filledCells = gameCells.filter(cell => cell.value !== 0);

            const response = await fetch(`http://${hostname}:${port}/${radius}`, {
                method: 'POST',
                body: JSON.stringify(filledCells),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const newFilledCells =  await response.json();

            setGameCells(gameCells => mergeCellsArrays(gameCells, newFilledCells));
        };

        requestNewFilledCells();
    }, [hostname, port, radius, isMoveDone]);

    return (
        <>
            <div className="board" style={{width: `${BOARD_WIDTH}px`}}>
                {gameCells.map(cell => (
                    <Cell
                        key={`${cell.x}${cell.y}${cell.z}`}
                        cellData={{x: cell.x, y: cell.y, z: cell.z, value: cell.value}}
                        size={getGridCellSize()}
                        boardRadius={radius}
                    />
                ))}
            </div>
            <p className="game-status-container">
                Game Status:&nbsp;
                <span className="game-status-container__status" data-status={gameStatus}>{gameStatus}</span>
            </p>
        </>
    );
}