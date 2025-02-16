import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import Alert from "./alert";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("Alert Component", () => {
  it("renders the alert with error message when error query param is present", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === "error" ? "Invalid login credentials" : null,
    });

    render(<Alert />);

    const alertElement = screen.getByText("Invalid login credentials");
    expect(alertElement).toBeInTheDocument();
  });

  it("does not render the alert when error query param is not present", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<Alert />);

    const alertElement = screen.queryByText("Invalid login credentials");
    expect(alertElement).not.toBeInTheDocument();
  });
});
