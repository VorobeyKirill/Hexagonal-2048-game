import { renderHook } from "@testing-library/react";
import { useGameStatus } from "../useGameStatus";

describe("useGameStatus", () => {
  test("setGameStatus is called with 'playing' when there are cells with value 0", () => {
    const gameCells = [
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: -1, z: 0, value: 0 },
      { x: -1, y: 1, z: 0, value: 4 },
    ];

    const setGameStatusMock = jest.fn();

    renderHook(() => useGameStatus(gameCells, setGameStatusMock));

    expect(setGameStatusMock).toHaveBeenCalledWith("playing");
  });

  test("setGameStatus is called with 'playing' when there are moves available (neighbours have same values)", () => {
    const gameCells = [
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: -1, z: 0, value: 4 },
      { x: -1, y: 1, z: 0, value: 2 },
    ];

    const setGameStatusMock = jest.fn();

    renderHook(() => useGameStatus(gameCells, setGameStatusMock));

    expect(setGameStatusMock).toHaveBeenCalledWith("playing");
  });

  test("setGameStatus is called with 'game-over' when there are no zero cells and no moves available", () => {
    const gameCells = [
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: -1, z: 0, value: 4 },
      { x: -1, y: 1, z: 0, value: 8 },
    ];

    const setGameStatusMock = jest.fn();

    renderHook(() => useGameStatus(gameCells, setGameStatusMock));

    expect(setGameStatusMock).toHaveBeenCalledWith("game-over");
  });
});
