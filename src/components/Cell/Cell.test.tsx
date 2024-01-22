import { render, screen } from "@testing-library/react";
import { Cell } from "./Cell";
import { CELL_BORDER_WIDTH } from "../../constants";

describe("Cell Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("matches snapshot", () => {
    const cellData = { x: 0, y: 0, z: 0, value: 2 };
    const size = 50;
    const boardRadius = 2;

    expect(
      render(<Cell cellData={cellData} size={size} boardRadius={boardRadius} />)
    ).toMatchSnapshot();
  });

  test("renders cell with correct coordinates and value", () => {
    const cellData = { x: 0, y: 0, z: 0, value: 2 };
    const size = 50;
    const boardRadius = 2;

    render(<Cell cellData={cellData} size={size} boardRadius={boardRadius} />);

    const cellElement = screen.getByTestId("cell");

    expect(cellElement).toBeInTheDocument();
    expect(cellElement).toHaveStyle({
      width: `${size * 2}px`,
      height: `${size * Math.sqrt(3)}px`,
    });
  });

  test("renders tile inside cell with correct styles and value", () => {
    const cellData = { x: 0, y: 0, z: 0, value: 2 };
    const size = 50;
    const boardRadius = 2;

    render(<Cell cellData={cellData} size={size} boardRadius={boardRadius} />);

    const tileElement = screen.getByTestId("cell-tile");

    expect(tileElement).toBeInTheDocument();
    expect(tileElement).toHaveStyle({
      width: `${size * 2 - CELL_BORDER_WIDTH * 4 + boardRadius}px`,
      height: `${size * Math.sqrt(3) - CELL_BORDER_WIDTH * 4 + boardRadius}px`,
      top: `${CELL_BORDER_WIDTH * 2 - boardRadius / 2}px`,
      left: `${CELL_BORDER_WIDTH * 2 - boardRadius / 2}px`,
    });
  });

  test("renders span with correct value inside tile", () => {
    const cellData = { x: 0, y: 0, z: 0, value: 2 };
    const size = 50;
    const boardRadius = 2;

    render(<Cell cellData={cellData} size={size} boardRadius={boardRadius} />);

    const spanElement = screen.getByText("2");

    expect(spanElement).toBeInTheDocument();
  });

  test("renders cell without value", () => {
    const cellData = { x: 0, y: 0, z: 0, value: 0 };
    const size = 50;
    const boardRadius = 2;

    render(<Cell cellData={cellData} size={size} boardRadius={boardRadius} />);

    const spanElement = screen.queryByText("0");

    expect(spanElement).toBeNull();
  });
});
