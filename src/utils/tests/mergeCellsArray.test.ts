import { CellData } from '../../types.global';
import { mergeCellsArrays } from '../mergeCellsArrays';

describe('mergeCellsArrays', () => {
  test('should merge cells arrays correctly', () => {
    const baseCellsArray = [
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: -1, z: 0, value: 0 },
      { x: -1, y: 1, z: 0, value: 4 },
    ];

    const newCellsArray = [
      { x: 0, y: 0, z: 0, value: 0 },
      { x: 1, y: -1, z: 0, value: 8 },
    ];

    const mergedArray = mergeCellsArrays(baseCellsArray, newCellsArray);

    expect(mergedArray).toEqual([
      { x: 0, y: 0, z: 0, value: 0 },
      { x: 1, y: -1, z: 0, value: 8 },
      { x: -1, y: 1, z: 0, value: 4 },
    ]);
  });

  test('should return the base array if new array is empty', () => {
    const baseCellsArray = [
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: -1, z: 0, value: 0 },
      { x: -1, y: 1, z: 0, value: 4 },
    ];

    const newCellsArray: CellData[] = [];

    const mergedArray = mergeCellsArrays(baseCellsArray, newCellsArray);

    expect(mergedArray).toEqual(baseCellsArray);
  });

  test('should handle empty base array correctly', () => {
    const baseCellsArray: CellData[] = [];

    const newCellsArray = [
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: -1, z: 0, value: 0 },
      { x: -1, y: 1, z: 0, value: 4 },
    ];

    const mergedArray = mergeCellsArrays(baseCellsArray, newCellsArray);

    expect(mergedArray).toEqual([]);
  });
});