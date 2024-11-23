import { render, screen } from "@testing-library/react";
import { Counter } from "../components/Counter";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

/*
Test that the initial count is rendered correctly based on the initialCount prop.
Test that clicking the "Increment" button increases the count.
Test that clicking the "Decrement" button decreases the count.
Test that the count cannot go below zero (add this logic to the component).
*/

describe("Counter", () => {
  it("renders the Counter component", () => {
    render(<Counter />);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });

  it("renders the initial count correctly based on the initialCount prop", async () => {
    render(<Counter initialCount={1} />);

    const counterEl = screen.getByText(/1/);

    expect(!!counterEl).toBeTruthy();
  });

  it("increments the count when the increment button is clicked", async () => {
    const { getByText } = render(<Counter initialCount={0} />);

    const incrementButtonEl = getByText(/Increment/);

    await userEvent.click(incrementButtonEl);

    const counterEl = getByText(/1/);

    expect(!!counterEl).toBeTruthy();
  });

  it("decrements the count when the decrement button is clicked", async () => {
    const { getByText } = render(<Counter initialCount={1} />);

    const decrementButtonEl = getByText(/Decrement/);

    await userEvent.click(decrementButtonEl);

    const counterEl = getByText(/0/);

    expect(!!counterEl).toBeTruthy();
  });

  it("does not decrement below zero", async () => {
    const { getByText } = render(<Counter initialCount={0} />);

    const decrementButtonEl = getByText(/Decrement/);

    await userEvent.click(decrementButtonEl);

    const counterEl = getByText(/0/);

    expect(!!counterEl).toBeTruthy();
  });
});
