import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ShoppingCart } from "../components/ShoppingCart";

/*
Test that items are added to the cart correctly when "Add Apple" or "Add Banana" is clicked.
Test that items are removed from the cart when the "Remove" button is clicked.
Test that the total price updates correctly when items are added or removed.
Test that the cart starts empty when the component is first rendered.
*/

describe("ShoppingCart", () => {
  it("shows an empty cart on first render", () => {
    render(<ShoppingCart />);

    const cartItems = screen.queryAllByRole("listitem");

    expect(cartItems.length).toEqual(0);
  });
  it("adds items to the cart when buttons are clicked", async () => {
    render(<ShoppingCart />);

    // Click "Add Apple" and "Add Banana" buttons
    const addButtons = ["Add Apple", "Add Banana"];
    for (const label of addButtons) {
      const button = screen.getByLabelText(label);
      await userEvent.click(button);
    }

    // Verify that the cart contains items with expected names
    const cartItems = screen.getAllByRole("listitem");

    expect(cartItems).toHaveLength(2);
    expect(cartItems[0]).toHaveTextContent(/Apple/i);
    expect(cartItems[1]).toHaveTextContent(/Banana/i);
  });

  it("removes items from the cart when the remove button is clicked", async () => {
    render(<ShoppingCart />);

    const addButton = screen.getByLabelText("Add Apple");

    await userEvent.click(addButton);

    const cartItems = screen.getAllByRole("listitem");

    expect(cartItems.length).toEqual(1);

    const removeButton = screen.getByLabelText("Remove Item");

    await userEvent.click(removeButton);

    const updatedCartItems = screen.queryAllByRole("listitem");

    expect(updatedCartItems.length).toEqual(0);
  });
});
