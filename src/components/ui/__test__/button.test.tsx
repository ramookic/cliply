import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../button";

describe("Button Component", () => {
  it("renders the button with children text", () => {
    render(
      <Button fit onClick={() => {}}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders a link when linkTo prop is provided", () => {
    render(
      <Button fit linkTo="/test">
        Link Button
      </Button>
    );
    const linkElement = screen.getByRole("link", { name: /link button/i });
    expect(linkElement).toHaveAttribute("href", "/test");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(
      <Button fit onClick={handleClick}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when disabled is true", () => {
    render(
      <Button fit disabled>
        Disabled Button
      </Button>
    );
    const buttonElement = screen.getByRole("button", {
      name: /disabled button/i,
    });
    expect(buttonElement).toBeDisabled();
  });
});
