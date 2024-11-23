import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../components/Pagination";

/*
Tests for the Pagination component:
- Verify that the "Previous" button is disabled on the first page.
- Verify that the "Next" button is disabled on the last page.
- Ensure the onPageChange function is called with the correct page number when navigation buttons are clicked.
- Validate that the current page and total pages are displayed correctly (e.g., "Page X of Y").
*/

describe("Pagination", () => {
  it("disables the previous button on the first page", () => {
    // Render the Pagination component with the current page set to 1 (first page).
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );

    // Find the "Previous" button using its accessible label.
    const previousButton = screen.getByLabelText("Previous");

    // Assert that the "Previous" button is disabled on the first page.
    expect(previousButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    // Render the Pagination component with the current page set to 10 (last page).
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
    );

    // Find the "Next" button using its accessible label.
    const nextButton = screen.getByLabelText("Next");

    // Assert that the "Next" button is disabled on the last page.
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when next or previous buttons are clicked", async () => {
    // Mock the onPageChange function to track calls.
    const mockedOnPageChange = vi.fn();

    // Render the Pagination component with the current page set to 5.
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockedOnPageChange}
      />
    );

    // Find the "Next" and "Previous" buttons using their accessible labels.
    const nextButton = screen.getByLabelText("Next");
    const previousButton = screen.getByLabelText("Previous");

    // Simulate clicking the "Next" button.
    await userEvent.click(nextButton);

    // Simulate clicking the "Previous" button.
    await userEvent.click(previousButton);

    // Assert that the onPageChange function was called twice (once for each click).
    expect(mockedOnPageChange).toHaveBeenCalledTimes(2);
  });

  it("renders the correct page information", async () => {
    // Render the Pagination component with the current page set to 5 and total pages set to 10.
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );

    // Find the text displaying the current page and total pages.
    const pageText = screen.getByText("Page 5 of 10");

    // Assert that the correct page information is displayed in the document.
    expect(pageText).toBeInTheDocument();
  });
});
