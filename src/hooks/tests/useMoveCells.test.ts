import { fireEvent, renderHook } from "@testing-library/react";
import { useMoveCells } from "../useMoveCells";
import { CellData } from "../../types.global";

describe("useMoveCells", () => {
  test("moves cells on keydown event", () => {
    const mockSetGameCells = jest.fn();
    const mockSetIsMoveDone = jest.fn();
    const mockGameCells = [
      { x: -1, y: 1, z: 0, value: 0 },
      { x: -1, y: 0, z: 1, value: 0 },
      { x: 0, y: 1, z: -1, value: 0 },
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 0, y: -1, z: 1, value: 0 },
      { x: 1, y: 0, z: -1, value: 0 },
      { x: 1, y: -1, z: 0, value: 0 },
    ];

    renderHook(() =>
      useMoveCells(mockGameCells, mockSetGameCells, mockSetIsMoveDone)
    );

    fireEvent.keyDown(document, { key: "q" });

    expect(mockSetGameCells).toHaveBeenCalledWith(expect.any(Array<CellData>));
    expect(mockSetIsMoveDone).toHaveBeenCalledWith(expect.any(Function));
  });

  test("does not move cells on keydown if isKeyPressed is true", () => {
    const mockSetGameCells = jest.fn();
    const mockSetIsMoveDone = jest.fn();
    const mockGameCells = [
      { x: -1, y: 1, z: 0, value: 0 },
      { x: -1, y: 0, z: 1, value: 0 },
      { x: 0, y: 1, z: -1, value: 0 },
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 0, y: -1, z: 1, value: 0 },
      { x: 1, y: 0, z: -1, value: 0 },
      { x: 1, y: -1, z: 0, value: 0 },
    ];

    renderHook(() =>
      useMoveCells(mockGameCells, mockSetGameCells, mockSetIsMoveDone)
    );

    fireEvent.keyDown(document, { key: "q" });
    fireEvent.keyDown(document, { key: "e" });

    expect(mockSetGameCells).toHaveBeenCalledTimes(1);
    expect(mockSetIsMoveDone).toHaveBeenCalledTimes(1);
  });

  test("resets isKeyPressed on keyup event", () => {
    const mockSetGameCells = jest.fn();
    const mockSetIsMoveDone = jest.fn();
    const mockGameCells = [
      { x: -1, y: 1, z: 0, value: 0 },
      { x: -1, y: 0, z: 1, value: 0 },
      { x: 0, y: 1, z: -1, value: 0 },
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 0, y: -1, z: 1, value: 0 },
      { x: 1, y: 0, z: -1, value: 0 },
      { x: 1, y: -1, z: 0, value: 0 },
    ];

    renderHook(() =>
      useMoveCells(mockGameCells, mockSetGameCells, mockSetIsMoveDone)
    );

    fireEvent.keyDown(document, { key: "q" });

    fireEvent.keyUp(document, { key: "q" });

    fireEvent.keyDown(document, { key: "e" });

    expect(mockSetGameCells).toHaveBeenCalledTimes(2);
    expect(mockSetIsMoveDone).toHaveBeenCalledTimes(2);
  });
});
