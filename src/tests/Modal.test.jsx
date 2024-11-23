import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../components/Modal";

/*
Tests for the Modal component:
- Ensure the modal is rendered when the `isOpen` prop is true.
- Verify that the modal is not rendered when the `isOpen` prop is false.
- Check that clicking the close button triggers the `onClose` function.
- Validate accessibility roles and attributes (e.g., `role="dialog"`, `aria-labelledby`, `aria-modal`).
*/

describe("Modal", () => {
  it("renders the modal when isOpen is true", () => {
    // Render the Modal component with `isOpen` set to true.
    render(<Modal isOpen={true} onClose={() => {}} />);

    // Query the modal by its ARIA role.
    const modal = screen.getByRole("dialog");

    // Assert that the modal is present in the DOM.
    expect(modal).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    // Render the Modal component with `isOpen` set to false.
    render(<Modal isOpen={false} onClose={() => {}} />);

    // Query the modal by its ARIA role and ensure it is not in the DOM.
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls the onClose function when close button is clicked", async () => {
    // Create a mock function to track onClose calls.
    const mockOnClose = vi.fn();

    // Render the Modal component with `isOpen` set to true and the mock onClose function.
    render(<Modal isOpen={true} onClose={mockOnClose} />);

    // Query the close button by its ARIA role.
    const closeButton = screen.getByRole("button");

    // Simulate a user click on the close button.
    await userEvent.click(closeButton);

    // Assert that the onClose function was called once.
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("ensures elements have accessibility roles and attributes", () => {
    // Render the Modal component with a title and content for accessibility validation.
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal Title"
        children={<p>This is a test modal content</p>}
      />
    );

    // Query the modal by its ARIA role.
    const modal = screen.getByRole("dialog");

    // Assert that the modal is present and has proper accessibility attributes.
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("aria-labelledby", "modal-title");
    expect(modal).toHaveAttribute("aria-modal", "true");

    // Query the modal title and ensure it is properly associated with the modal.
    const title = screen.getByText("Test Modal Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute("id", "modal-title");

    // Query the modal content and ensure it is rendered inside the modal.
    const content = screen.getByText("This is a test modal content");
    expect(content).toBeInTheDocument();
  });
});
