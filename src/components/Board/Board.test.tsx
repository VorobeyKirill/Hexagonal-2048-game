import { render, screen } from "@testing-library/react";
import { Board } from "./Board";
import { CellProps } from "../Cell/Cell.types";

jest.mock("../../hooks/useBoardGrid", () => ({
  useBoardGrid: () => ({
    getGridCellsCoords: () => [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 1 },
    ],
    getGridCellSize: () => 100,
  }),
}));

jest.mock("../../hooks/useMoveCells", () => ({
  useMoveCells: jest.fn(),
}));

jest.mock("../../hooks/useGameStatus", () => ({
  useGameStatus: jest.fn(),
}));

jest.mock("../../utils/mergeCellsArrays", () => ({
  mergeCellsArrays: jest.fn(),
}));

jest.mock("../Cell/Cell", () => ({
  Cell: (props: CellProps) => (
    <div
      data-testid={`cell-${props.cellData.x}-${props.cellData.y}-${props.cellData.z}`}
    />
  ),
}));

describe("Board Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("matches snapshot", () => {
    expect(
      render(<Board radius={2} hostname="localhost" port="80" />)
    ).toMatchSnapshot();
  });

  test("renders Board component with cells according to getGridCellsCoords array", () => {
    render(<Board radius={2} hostname="localhost" port="80" />);

    expect(screen.getByTestId("cell-0-0-0")).toBeInTheDocument();
    expect(screen.getByTestId("cell-0-1-1")).toBeInTheDocument();
  });

  test("renders game status element with playing text by default", () => {
    render(<Board radius={2} hostname="localhost" port="80" />);

    expect(screen.getByText("Game Status:")).toBeInTheDocument();
    expect(screen.getByText("playing")).toBeInTheDocument();
  });
});
