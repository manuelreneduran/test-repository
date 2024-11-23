import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LoginForm } from "../components/Form";

/*
Test that typing in the input fields updates their values.
Test that the "Submit" button is disabled if either field is empty.
Test that the handleSubmit function is called with the correct form values.
Mock console.log and test that the form values are logged correctly.
*/

describe("Form", () => {
  it("updates input fields when user types", async () => {
    const testVal = "test";
    // get input element
    const { getByLabelText } = render(<LoginForm />);
    const inputEl = getByLabelText("Email:");

    // type in it
    await userEvent.type(inputEl, testVal);

    // get the value
    expect(inputEl.value).toBe(testVal);
  });

  it("disables submit if either field is empty", async () => {
    const testVal = "test";

    const { getByRole, getAllByRole } = render(<LoginForm />);
    const inputs = getAllByRole("textbox");

    const emailInputEl = inputs[0];

    await userEvent.type(emailInputEl, testVal);

    const buttonEl = getByRole("button");

    expect(buttonEl).toBeDisabled();
  });
});
