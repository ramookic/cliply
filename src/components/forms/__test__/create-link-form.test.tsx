import { createLinkAction } from "@/lib/actions";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateLinkForm from "../create-link-form";

jest.mock("../../../lib/actions.ts", () => ({
  createLinkAction: jest.fn(),
}));

describe("CreateLinkForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form inputs and the submit button", () => {
    render(<CreateLinkForm />);

    expect(screen.getByLabelText("Original URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Short code")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("displays validation errors for invalid inputs", async () => {
    render(<CreateLinkForm />);

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid URL format.")).toBeInTheDocument();
    });
  });

  it("calls createLinkAction with the correct data on valid submission", async () => {
    render(<CreateLinkForm />);

    fireEvent.input(screen.getByLabelText("Original URL"), {
      target: { value: "https://lognurl.com/blog/article/23" },
    });
    fireEvent.input(screen.getByLabelText("Short code"), {
      target: { value: "code" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() => {
      expect(createLinkAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    const formData = (createLinkAction as jest.Mock).mock.calls[0][0];
    expect(formData.get("originalUrl")).toBe(
      "https://lognurl.com/blog/article/23"
    );
    expect(formData.get("shortcode")).toBe("code");
  });
});
