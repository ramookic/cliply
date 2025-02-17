import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../register-form";
import { registerAction } from "@/lib/actions";

jest.mock("../../../lib/actions.ts", () => ({
  registerAction: jest.fn(),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form inputs and the submit button", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(
        screen.getByText("Name must be at least 4 characters")
      ).toBeInTheDocument();
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
      expect(
        screen.getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });

  it("calls registerAction with the correct data on valid submission", async () => {
    render(<RegisterForm />);

    fireEvent.input(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.input(screen.getByLabelText("Password"), {
      target: { value: "Password123" },
    });
    fireEvent.input(screen.getByLabelText("Confirm password"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(registerAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    const formData = (registerAction as jest.Mock).mock.calls[0][0];
    expect(formData.get("name")).toBe("John Doe");
    expect(formData.get("email")).toBe("john.doe@example.com");
    expect(formData.get("password")).toBe("Password123");
    expect(formData.get("confirmPassword")).toBe("Password123");
  });
});
