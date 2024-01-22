import { render, screen } from "@testing-library/react";
import { App } from "./App";

jest.mock("../Board/Board", () => ({
  Board: () => <div data-testid="mocked-board">Mocked Board</div>,
}));

jest.mock("../GameSettings/GameSettings", () => ({
  GameSettings: () => (
    <div data-testid="mocked-game-settings">Mocked GameSettings</div>
  ),
}));

const mockSearchParams = new URLSearchParams();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useSearchParams: () => [mockSearchParams, jest.fn()],
  };
});

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("matches snapshot", () => {
    expect(render(<App />)).toMatchSnapshot();
  });

  test("renders Board when game is valid", () => {
    mockSearchParams.set("hostname", "localhost");
    mockSearchParams.set("radius", "2");
    mockSearchParams.set("port", "80");

    render(<App />);

    expect(screen.getByTestId("mocked-board")).toBeInTheDocument();
  });

  test("renders GameSettings when game is not valid", () => {
    mockSearchParams.set("radius", "10"); // Invalid radius

    render(<App />);

    expect(screen.getByTestId("mocked-game-settings")).toBeInTheDocument();
  });
});
