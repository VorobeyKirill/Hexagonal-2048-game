import { FC, useEffect, useState } from "react";
import { BoardProps } from "./Board.types";
import { useBoardGrid } from "../../hooks/useBoardGrid";
import { Cell } from "../Cell/Cell";
import { CellData } from "../../types.global";
import { BOARD_WIDTH } from "../../constants";

import "./Board.scss";
import { mergeCellsArrays } from "../../utils/mergeCellsArrays";
import { useMoveCells } from "../../hooks/useMoveCells";

export const Board: FC<BoardProps> = ({ radius, hostname, port }) => {
    // Hook for all methods related to the coordinates of cells in the grid and their size
    const { getGridCellsCoords, getGridCellSize } = useBoardGrid(radius);

    const [isMoveDone, setIsMoveDone] = useState(false);

    // Setting all cells with their coordinates and zero value by default
    const [gameCells, setGameCells] = useState<CellData[]>(() => {
        return getGridCellsCoords().map(cellCoord => (
            {
                ...cellCoord,
                value: 0,
            }
        ));
    });

    useMoveCells(gameCells, setGameCells, setIsMoveDone);

    // useEffect to request new random filled cells from the server
    useEffect(() => {
        const requestNewFilledCells = async () => {
            const filledCells = gameCells.filter(cell => cell.value !== 0);

            const response = await fetch(`http://${hostname}:${port}/${radius}`, {
                method: 'POST',
                body: JSON.stringify(filledCells)
            });

            const newFilledCells =  await response.json();

            setGameCells(gameCells => mergeCellsArrays(gameCells, newFilledCells));
        };

        requestNewFilledCells();
    }, [hostname, port, radius, isMoveDone]);


    return <div className="board" style={{width: `${BOARD_WIDTH}px`}}>
        {gameCells.map(cell => (
            <Cell
                key={`${cell.x}${cell.y}${cell.z}`}
                cellData={{x: cell.x, y: cell.y, z: cell.z, value: cell.value}}
                size={getGridCellSize()}
                boardRadius={radius}
            />
        ))}
    </div>;
}