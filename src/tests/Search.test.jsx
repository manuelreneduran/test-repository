// Import necessary functions and utilities from testing libraries
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw"; // Mock Service Worker for API mocking
import { setupServer } from "msw/node"; // Node.js-specific server setup
import { describe, expect, it } from "vitest";
import { Search } from "../components/Search";

/*
Tests for the Search component:
- Verify the "Search" button is disabled when the input is empty.
- Check that typing in the input field enables the "Search" button.
- Mock the API to ensure search results are displayed when the API resolves.
- Simulate an API error and ensure the error message is rendered correctly.
- Test the loading state of the component while waiting for the API response.
*/

// Mock user data returned by the API
const results = ["foo", "bar"];

// Set up a mock server to intercept API calls
const server = setupServer(
  http.get("/api/search", () => {
    // Mock API response returning a list of results
    return HttpResponse.json(results);
  })
);

// Lifecycle hooks for starting/stopping the mock server during testing
beforeAll(() => server.listen()); // Start the mock server before all tests
afterEach(() => server.resetHandlers()); // Reset request handlers after each test to avoid interference
afterAll(() => server.close()); // Close the mock server after all tests

describe("Search", () => {
  const text = "Hi"; // Input text for tests

  it("disables the search button when input is empty", () => {
    // Render the Search component
    render(<Search />);

    // Find the search button
    const button = screen.getByRole("button");

    // Assert that the button is disabled when no input is provided
    expect(button).toBeDisabled();
  });

  it("enables the search button when user types in input", async () => {
    // Render the Search component
    render(<Search />);

    // Find the input textbox and search button
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Simulate typing into the input field
    await userEvent.type(input, text);

    // Assert that the button is enabled after input is provided
    expect(button).toBeEnabled();
  });

  it("displays search results when user types and API call is resolved", async () => {
    // Render the Search component
    render(<Search />);

    // Find the input textbox and search button
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Simulate typing into the input field and clicking the search button
    await userEvent.type(input, text);
    await userEvent.click(button);

    // Wait for the search results to appear in the DOM
    const listItems = await screen.findAllByRole("listitem");

    // Extract text content of each list item
    const renderedValues = listItems.map((item) => item.textContent);

    // Assert that the results from the API match the rendered list items
    for (let i = 0; i < results.length; i++) {
      expect(results[i]).toEqual(renderedValues[i]);
    }
  });

  it("renders a failure state when API call returns an error", async () => {
    // Override the mock server to return a 500 error for this test
    server.use(
      http.get("/api/search", () => {
        return new HttpResponse(null, { status: 500 }); // Simulate server error
      })
    );

    // Render the Search component
    render(<Search />);

    // Find the input textbox and search button
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Simulate typing into the input field and clicking the search button
    await userEvent.type(input, text);
    await userEvent.click(button);

    // Assert that an error alert is displayed when the API fails
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("renders a loading state while API resolves", async () => {
    // Override the mock server to introduce a delay in the API response
    server.use(
      http.get("/api/search", async () => {
        await delay(1000); // Simulate a delay in the API response
        return HttpResponse.json(results);
      })
    );

    // Render the Search component
    render(<Search />);

    // Find the input textbox and search button
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Simulate typing into the input field and clicking the search button
    await userEvent.type(input, text);
    await userEvent.click(button);

    // Assert that the loading message is displayed while waiting for the API response
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the loading message to disappear
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    // Assert that the search results are displayed after the API resolves
    expect(screen.getByText("foo")).toBeInTheDocument();
  });
});
