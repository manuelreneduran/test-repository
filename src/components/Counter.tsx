import React, { useState } from "react";

interface CounterProps {
  initialCount?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  function incrementCounter() {
    setCount((prev) => prev + 1);
  }

  function decrementCounter() {
    setCount((prev) => (prev < 1 ? 0 : prev - 1));
  }
  return (
    <div>
      <h1 data-testid="counter">Count: {count}</h1>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
    </div>
  );
};
