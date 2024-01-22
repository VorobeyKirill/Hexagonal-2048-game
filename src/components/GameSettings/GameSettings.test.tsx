import { render, fireEvent, screen } from "@testing-library/react";
import { GameSettings } from "./GameSettings";
import { PORT, RNG_HOSTNAME } from "./GameSettings.types";
import { BOARD_RADIUS } from "../../types.global";

describe("GameSettings Component", () => {
  test("matches snapshot", () => {
    const setSearchParamsMock = jest.fn();

    expect(
      render(<GameSettings setSearchParams={setSearchParamsMock} />)
    ).toMatchSnapshot();
  });

  test("renders form with correct default values", () => {
    const setSearchParamsMock = jest.fn();

    render(<GameSettings setSearchParams={setSearchParamsMock} />);

    const portInput = screen.getByLabelText("Port") as HTMLInputElement;
    const hostnameInput = screen.getByLabelText("Hostname") as HTMLInputElement;
    const radiusInput = screen.getByLabelText(
      /^Radius - [2-6]$/
    ) as HTMLInputElement;

    expect(portInput.value).toBe(PORT.DEFAULT);
    expect(hostnameInput.value).toBe(RNG_HOSTNAME.RNG_SERVER);
    expect(radiusInput.value).toBe(String(BOARD_RADIUS.MIN));
  });

  test("updates settings on input change", () => {
    const setSearchParamsMock = jest.fn();

    render(<GameSettings setSearchParams={setSearchParamsMock} />);

    const portInput = screen.getByLabelText("Port") as HTMLInputElement;
    const hostnameInput = screen.getByLabelText("Hostname") as HTMLInputElement;
    const radiusInput = screen.getByLabelText(
      /^Radius - [2-6]$/
    ) as HTMLInputElement;

    fireEvent.change(portInput, { target: { value: "3000" } });
    fireEvent.change(hostnameInput, { target: { value: "localhost" } });
    fireEvent.change(radiusInput, { target: { value: "6" } });

    expect(portInput.value).toBe("3000");
    expect(hostnameInput.value).toBe("localhost");
    expect(radiusInput.value).toBe("6");
  });

  test("calls setSearchParams on form submit", () => {
    const setSearchParamsMock = jest.fn();

    render(<GameSettings setSearchParams={setSearchParamsMock} />);

    const form = screen.getByTestId("settings-form");

    fireEvent.submit(form);

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      port: PORT.DEFAULT,
      hostname: RNG_HOSTNAME.RNG_SERVER,
      radius: String(BOARD_RADIUS.MIN),
    });
  });

  test("updates radius on range input change", () => {
    const setSearchParamsMock = jest.fn();

    render(<GameSettings setSearchParams={setSearchParamsMock} />);

    const radiusInput = screen.getByLabelText(
      /^Radius - [2-6]$/
    ) as HTMLInputElement;

    fireEvent.change(radiusInput, { target: { value: "4" } });

    expect(radiusInput.value).toBe("4");
  });
});
