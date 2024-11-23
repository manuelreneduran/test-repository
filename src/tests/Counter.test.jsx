import { render, screen } from "@testing-library/react";
import { Counter } from "../components/Counter";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

/*
Tests for the Counter component:
- Verify the component renders correctly.
- Ensure the initial count is displayed based on the `initialCount` prop.
- Test that the "Increment" button increases the count.
- Test that the "Decrement" button decreases the count.
- Verify that the count does not go below zero.
*/

describe("Counter", () => {
  it("renders the Counter component", () => {
    // Render the Counter component
    render(<Counter initialCount={0} />);

    // Use debug to print the component's structure for verification
    screen.debug();
  });

  it("renders the initial count correctly based on the initialCount prop", () => {
    // Render the Counter component with an initial count of 1
    render(<Counter initialCount={1} />);

    // Assert that the initial count is rendered correctly
    const counterEl = screen.getByText(/1/);
    expect(counterEl).toBeInTheDocument();
  });

  it("increments the count when the increment button is clicked", async () => {
    // Render the Counter component with an initial count of 0
    render(<Counter initialCount={0} />);

    // Find the increment button
    const incrementButtonEl = screen.getByText("Increment");

    // Simulate a click on the increment button
    await userEvent.click(incrementButtonEl);

    // Assert that the count has incremented to 1
    const counterEl = screen.getByText(/1/);
    expect(counterEl).toBeInTheDocument();
  });

  it("decrements the count when the decrement button is clicked", async () => {
    // Render the Counter component with an initial count of 1
    render(<Counter initialCount={1} />);

    // Find the decrement button
    const decrementButtonEl = screen.getByText("Decrement");

    // Simulate a click on the decrement button
    await userEvent.click(decrementButtonEl);

    // Assert that the count has decremented to 0
    const counterEl = screen.getByText(/0/);
    expect(counterEl).toBeInTheDocument();
  });

  it("does not decrement below zero", async () => {
    // Render the Counter component with an initial count of 0
    render(<Counter initialCount={0} />);

    // Find the decrement button
    const decrementButtonEl = screen.getByText("Decrement");

    // Simulate a click on the decrement button
    await userEvent.click(decrementButtonEl);

    // Assert that the count is still 0 and does not go below zero
    const counterEl = screen.getByText(/0/);
    expect(counterEl).toBeInTheDocument();
  });
});
