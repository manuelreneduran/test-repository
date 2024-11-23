import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dropdown } from "../components/Dropdown";

/*
Test that the default value of the dropdown is "Select an option."
Test that selecting an option updates the displayed text.
Mock the onSelect callback and verify it is called with the correct value.
Test that the component renders all the provided options.
*/

describe("Dropdown", () => {
  const options = ["Hello", "There", "My", "Friend"];
  const defaultValue = "Select an option";

  it("sets the default value of the dropdown", async () => {
    // Render the component
    const { getByRole } = render(<Dropdown options={options} />);

    // Get the select element
    const selectElement = getByRole("combobox");

    // Assert that the default value is "Select an option"
    expect(selectElement).toHaveDisplayValue(defaultValue);
  });

  it("updates the displayed text when selecting an options", async () => {
    const { getByRole } = render(
      <Dropdown options={options} onSelect={() => {}} />
    );

    // Get the select element
    const selectElement = getByRole("combobox");

    await userEvent.selectOptions(selectElement, "Hello");

    expect(selectElement).toHaveDisplayValue("Hello");
  });

  it("calls the onselect callback when an option is chosen", async () => {
    const onSelectMock = vi.fn();

    const { getByRole } = render(
      <Dropdown options={options} onSelect={onSelectMock} />
    );

    // Get the select element
    const selectElement = getByRole("combobox");

    await userEvent.selectOptions(selectElement, "Hello");

    expect(onSelectMock).toHaveBeenCalled();
  });

  it("renders all the provided options", async () => {
    const { getAllByRole, getByText } = render(
      <Dropdown options={options} onSelect={() => {}} />
    );

    // Get all the options
    const renderedOptions = getAllByRole("option");

    // Assert that the correct number of options is rendered
    expect(renderedOptions.length).toEqual(options.length + 1);

    // Assert that each option text matches the provided list
    options.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });
});
