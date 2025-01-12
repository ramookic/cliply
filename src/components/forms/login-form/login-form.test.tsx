import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./login-form";
import { loginAction } from "@/lib/actions";

jest.mock("../../../lib/actions.ts", () => ({
  loginAction: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form inputs and the submit button", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });

  it("calls loginAction with the correct data on valid submission", async () => {
    render(<LoginForm />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(loginAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    const formData = (loginAction as jest.Mock).mock.calls[0][0];
    expect(formData.get("email")).toBe("john.doe@example.com");
    expect(formData.get("password")).toBe("Password123");
  });
});
