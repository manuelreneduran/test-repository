import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ShoppingCart } from "../components/ShoppingCart";

/*
Tests for the ShoppingCart component:
- Verify the cart is empty upon initial render.
- Ensure items are added correctly when the respective "Add" buttons are clicked.
- Confirm items can be removed from the cart using the "Remove" button.
- Validate that the total price updates correctly when items are added or removed (if applicable).
*/

describe("ShoppingCart", () => {
  it("shows an empty cart on first render", () => {
    // Render the ShoppingCart component.
    render(<ShoppingCart />);

    // Query all list items representing cart items.
    const cartItems = screen.queryAllByRole("listitem");

    // Verify that the cart is initially empty.
    expect(cartItems.length).toEqual(0);
  });

  it("adds items to the cart when buttons are clicked", async () => {
    // Render the ShoppingCart component.
    render(<ShoppingCart />);

    // Define the buttons to simulate user clicks for adding items.
    const addButtons = ["Add Apple", "Add Banana"];
    for (const label of addButtons) {
      const button = screen.getByLabelText(label); // Locate button by its label text.
      await userEvent.click(button); // Simulate clicking the button.
    }

    // Query all list items representing cart items after additions.
    const cartItems = screen.getAllByRole("listitem");

    // Verify that the cart contains the correct number and names of items.
    expect(cartItems).toHaveLength(2); // Two items should be present.
    expect(cartItems[0]).toHaveTextContent(/Apple/i); // First item is "Apple".
    expect(cartItems[1]).toHaveTextContent(/Banana/i); // Second item is "Banana".
  });

  it("removes items from the cart when the remove button is clicked", async () => {
    // Render the ShoppingCart component.
    render(<ShoppingCart />);

    // Simulate adding an item (e.g., "Apple") to the cart.
    const addButton = screen.getByLabelText("Add Apple");
    await userEvent.click(addButton);

    // Query the cart items to verify the addition.
    const cartItems = screen.getAllByRole("listitem");
    expect(cartItems.length).toEqual(1); // Verify the cart now contains one item.

    // Simulate clicking the "Remove Item" button for the added item.
    const removeButton = screen.getByLabelText("Remove Item");
    await userEvent.click(removeButton);

    // Query the cart items after removal.
    const updatedCartItems = screen.queryAllByRole("listitem");

    // Verify the cart is empty after the item is removed.
    expect(updatedCartItems.length).toEqual(0);
  });
});
