import { renderHook } from "@testing-library/react";
import { useBoardGrid } from "../useBoardGrid";
import { BOARD_WIDTH } from "../../constants";

describe("useBoardGrid", () => {
  test("getGridCellsCoords returns correct coordinates for radius 2", () => {
    const { result } = renderHook(() => useBoardGrid(2));
    const { getGridCellsCoords } = result.current;

    const coords = getGridCellsCoords();

    expect(coords).toEqual([
      { x: -1, y: 1, z: 0 },
      { x: -1, y: 0, z: 1 },
      { x: 0, y: 1, z: -1 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: -1, z: 1 },
      { x: 1, y: 0, z: -1 },
      { x: 1, y: -1, z: 0 },
    ]);
  });

  test("getGridCellSize returns correct size for radius 3", () => {
    const { result } = renderHook(() => useBoardGrid(3));
    const { getGridCellSize } = result.current;

    const cellSize = getGridCellSize();

    expect(cellSize).toBeCloseTo(BOARD_WIDTH / 8, 5);
  });
});
