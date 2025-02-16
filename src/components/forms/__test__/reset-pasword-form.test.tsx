import { resetPasswordAction } from "@/lib/actions";
import ResetPasswordForm from "../reset-password-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("../../../lib/actions.ts", () => ({
  resetPasswordAction: jest.fn(),
}));

describe("ResetPasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form input and submit button", () => {
    render(<ResetPasswordForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });

  it("displays validation error for invalid input", async () => {
    render(<ResetPasswordForm />);

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("calls resetPasswordAction with the correct data on valid submission", async () => {
    render(<ResetPasswordForm />);

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    await waitFor(() => {
      expect(resetPasswordAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    const formData = (resetPasswordAction as jest.Mock).mock.calls[0][0];
    expect(formData.get("email")).toBe("john.doe@example.com");
  });
});
