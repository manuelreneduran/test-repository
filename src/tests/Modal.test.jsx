import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../components/Modal";

/*
Test that the modal is not rendered when isOpen is false.
Test that the modal is rendered when isOpen is true.
Test that clicking the close button calls the onClose function.
Test accessibility roles and attributes (role="dialog", aria-labelledby, aria-modal).
*/

describe("Modal", () => {
  it("renders the modal when isOpen is true", () => {
    render(<Modal isOpen={true} onClose={() => {}} />);

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  it("does not renders the modal when isOpen is false", () => {
    render(<Modal isOpen={false} onClose={() => {}} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls the onclose function when close button is clicked", async () => {
    const mockOnClose = vi.fn();

    render(<Modal isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button");

    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("ensures elements have accessibility roles and attributes", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal Title"
        children={<p>This is a test modal content</p>}
      />
    );

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("aria-labelledby", "modal-title");
    expect(modal).toHaveAttribute("aria-modal", "true");

    const title = screen.getByText("Test Modal Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("id", "modal-title");

    const content = screen.getByText("This is a test modal content");
    expect(content).toBeInTheDocument();
  });
});
