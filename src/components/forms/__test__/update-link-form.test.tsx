import { updateLinkAction } from "@/lib/actions";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateLinkForm from "../update-link-form";

jest.mock("../../../lib/actions.ts", () => ({
  updateLinkAction: jest.fn(),
}));

const linkData = {
  created_at: "example-date",
  id: 332,
  original_url: "https://lognurl.com/blog/article/23",
  short_code: "code",
  user_id: "userId",
};

describe("UpdateLinkForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form inputs and the submit button", () => {
    render(<UpdateLinkForm linkData={linkData} />);

    expect(screen.getByLabelText("Original URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Short code")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("calls updateLinkAction with the correct data on valid submission", async () => {
    render(<UpdateLinkForm linkData={linkData} />);

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateLinkAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    const formData = (updateLinkAction as jest.Mock).mock.calls[0][0];
    expect(formData.get("originalUrl")).toBe(linkData.original_url);
    expect(formData.get("shortcode")).toBe(linkData.short_code);
  });
});
