import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    onSelect(value);
  };

  return (
    <div>
      <select value={selected} onChange={handleChange}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selected && <p>Selected: {selected}</p>}
    </div>
  );
};
