import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LoginForm } from "../components/Form";

/*
Tests for the LoginForm component:
- Ensure typing in input fields updates their values.
- Verify that the "Submit" button is disabled if either input field is empty.
- Check that the handleSubmit function is called with the correct form values (to be implemented).
- Mock `console.log` and validate that the form values are logged correctly (to be implemented).
*/

describe("Form", () => {
  it("updates input fields when user types", async () => {
    const testVal = "test@example.com";

    // Render the LoginForm component.
    const { getByLabelText } = render(<LoginForm />);

    // Get the email input field by its label.
    const inputEl = getByLabelText("Email:");

    // Simulate user typing in the email input field.
    await userEvent.type(inputEl, testVal);

    // Assert that the input field's value is updated to the typed value.
    expect(inputEl.value).toBe(testVal);
  });

  it("disables submit if either field is empty", async () => {
    const testVal = "test@example.com";

    // Render the LoginForm component.
    const { getByRole, getAllByRole } = render(<LoginForm />);

    // Get all text input fields.
    const inputs = getAllByRole("textbox");

    // Get the email input field and type a value.
    const emailInputEl = inputs[0];
    await userEvent.type(emailInputEl, testVal);

    // Get the submit button.
    const buttonEl = getByRole("button");

    // Assert that the submit button is disabled since one field is still empty.
    expect(buttonEl).toBeDisabled();
  });
});
