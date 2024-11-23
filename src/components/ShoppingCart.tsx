import React, { useState } from "react";

interface Item {
  id: number;
  name: string;
  price: number;
}

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <button
        aria-label="Add Apple"
        onClick={() => addItem({ id: 1, name: "Apple", price: 1.5 })}
      >
        Add Apple
      </button>
      <button
        aria-label="Add Banana"
        onClick={() => addItem({ id: 2, name: "Banana", price: 1.2 })}
      >
        Add Banana
      </button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}
            <button
              aria-label="Remove Item"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>Total: ${getTotal().toFixed(2)}</div>
    </div>
  );
};
