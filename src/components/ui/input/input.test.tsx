import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./input";

describe("Input Component", () => {
  test("renders input with label", () => {
    render(
      <Input label="Username" id="username" placeholder="Enter your username" />
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your username")
    ).toBeInTheDocument();
  });

  test("calls onChange handler when typed into", async () => {
    const handleChange = jest.fn();
    render(<Input id="email" type="email" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test@example.com");

    expect(handleChange).toHaveBeenCalledTimes("test@example.com".length);
  });

  test("displays an error message", () => {
    render(<Input label="Email" id="email" error="Invalid email address" />);

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Input id="custom" className="custom-class" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  test("handles required attribute", () => {
    render(<Input id="required" label="Required Input" required />);

    const input = screen.getByLabelText("Required Input");
    expect(input).toBeRequired();
  });

  test("handles default value", () => {
    render(<Input id="default" defaultValue="Default Value" />);

    const input = screen.getByDisplayValue("Default Value");
    expect(input).toBeInTheDocument();
  });
});
