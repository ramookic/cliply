import { updatePasswordAction } from "@/lib/actions";
import UpdatePasswordForm from "./update-password-form";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

jest.mock("../../../lib/actions.ts", () => ({
  updatePasswordAction: jest.fn(),
}));

const code = "example-code";

describe("UpdatePasswordForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form inputs and the submit button", () => {
    render(<UpdatePasswordForm code={code} />);

    expect(screen.getByLabelText("New password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(<UpdatePasswordForm code={code} />);

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });

  it("calls updatePasswordAction with the correct data on valid submission", async () => {
    render(<UpdatePasswordForm code={code} />);

    fireEvent.input(screen.getByLabelText("New password"), {
      target: { value: "Password123" },
    });
    fireEvent.input(screen.getByLabelText("Confirm password"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updatePasswordAction).toHaveBeenCalledWith(
        expect.any(FormData),
        code
      );
    });

    const formData = (updatePasswordAction as jest.Mock).mock.calls[0][0];
    expect(formData.get("password")).toBe("Password123");
    expect(formData.get("confirmPassword")).toBe("Password123");
  });
});
