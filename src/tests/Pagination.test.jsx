import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../components/Pagination";

/*
Test that the "Previous" button is disabled on the first page.
Test that the "Next" button is disabled on the last page.
Test that clicking "Previous" or "Next" calls the onPageChange function with the correct page number.
Test that the correct page information (e.g., "Page X of Y") is displayed.
*/

describe("Pagination", () => {
  it("disables the previous button on the first page", () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );

    const previousButton = screen.getByLabelText("Previous");

    expect(previousButton).toBeDisabled();
  });

  it("disables the next button on the last page", () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
    );

    const nextButton = screen.getByLabelText("Next");

    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when next or previous buttons are clicked", async () => {
    const mockedOnPageChange = vi.fn();

    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockedOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next");
    const previousButton = screen.getByLabelText("Previous");

    await userEvent.click(nextButton);
    await userEvent.click(previousButton);

    expect(mockedOnPageChange).toHaveBeenCalledTimes(2);
  });

  it("renders the correct page information", async () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );

    const pageText = screen.getByText("Page 5 of 10");

    expect(pageText).toBeInTheDocument();
  });
});
