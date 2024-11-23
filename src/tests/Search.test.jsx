// Import necessary functions and utilities from testing libraries
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw"; // Mock Service Worker for API mocking
import { setupServer } from "msw/node"; // Node.js-specific server setup
import { describe, expect, it } from "vitest";
import { Search } from "../components/Search";

/*
Test that the "Search" button is disabled when the input is empty.
Mock the API call and test that search results are displayed correctly.
Mock an API failure and test that the error message is displayed.
Test the loading state while waiting for the API call to complete.
*/

// Mock user data returned by the API
const results = ["foo", "bar"];

// Set up a mock server to intercept API calls
const server = setupServer(
  http.get("/api/search", () => {
    // Mock response with a list of strings
    return HttpResponse.json(results);
  })
);

// Lifecycle hooks for starting/stopping the mock server during testing
beforeAll(() => server.listen()); // Start server before all tests
afterEach(() => server.resetHandlers()); // Reset any request handlers after each test
afterAll(() => server.close()); // Close server after all tests

describe("Search", () => {
  const text = "Hi";

  it("disables the search button when input is empty", () => {
    render(<Search />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("enables the search button when user types in input", async () => {
    render(<Search />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await userEvent.type(input, text);
    expect(button).toBeEnabled();
  });

  it("displays search results when user types and API call is resolved", async () => {
    render(<Search />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await userEvent.type(input, text);
    await userEvent.click(button);

    const listItems = await screen.findAllByRole("listitem");
    const renderedValues = listItems.map((item) => item.textContent);

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
    render(<Search />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await userEvent.type(input, text);
    await userEvent.click(button);

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("renders a loading state while API resolves", async () => {
    server.use(
      http.get("/api/search", async () => {
        await delay(1000);
        return HttpResponse.json(results);
      })
    );
    render(<Search />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await userEvent.type(input, text);
    await userEvent.click(button);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the loading state to disappear
    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByText("foo")).toBeInTheDocument();
  });
});
