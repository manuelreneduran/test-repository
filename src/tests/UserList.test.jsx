// Import necessary functions and utilities from testing libraries
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw"; // Mock Service Worker for API mocking
import { setupServer } from "msw/node"; // Node.js-specific server setup
import { describe, expect, it } from "vitest";
import { UserList } from "../components/UserList";

/*
The component initially renders a "Loading..." message while the API call is in progress.
If the API call succeeds, the component displays a list of user names.
If the API call fails, the component displays an error message.
*/

// Mock user data returned by the API
const users = [
  { id: 1, name: "Jonathan Franks" },
  { id: 2, name: "Wilma Brian" },
  { id: 3, name: "David Rankin" },
];

// Set up a mock server to intercept API calls
const server = setupServer(
  http.get("/users", () => {
    // Mock response with a list of users
    return HttpResponse.json(users);
  })
);

// Lifecycle hooks for starting/stopping the mock server during testing
beforeAll(() => server.listen()); // Start server before all tests
afterEach(() => server.resetHandlers()); // Reset any request handlers after each test
afterAll(() => server.close()); // Close server after all tests

describe("UserList", () => {
  // Test case: Check if the loading message is displayed while waiting for the API response
  it("renders a loading message while the api call is in progress", async () => {
    const { getByText } = render(<UserList />); // Render the UserList component

    const loadingEl = getByText("Loading..."); // Look for the "Loading..." text

    expect(loadingEl).toBeInTheDocument(); // Assert that the loading message is present in the DOM
  });

  // Test case: Verify that the component displays a list of users after the API call succeeds
  it("displays a list of users if the api call succeeds", async () => {
    render(<UserList />); // Render the UserList component

    const renderedUsers = await screen.findAllByRole("listitem"); // Wait for all list items to render

    expect(users.length).toEqual(renderedUsers.length); // Assert the number of rendered items matches the user data

    const userKeys = users.map((el) => el.name); // Extract user names from the mock data
    const renderedKeys = renderedUsers.map((el) => el.textContent); // Extract text content of rendered list items

    // Assert that each rendered user name matches the mock user data
    for (let i = 0; i < userKeys.length; i++) {
      expect(userKeys[i]).toEqual(renderedKeys[i]);
    }
  });

  // Test case: Check if an error message is displayed when the API call fails
  it("displays an error if the api call fails", async () => {
    // Override the mock server to return a 500 error for this test
    server.use(
      http.get("/users", () => {
        return new HttpResponse(null, { status: 500 }); // Simulate server error
      })
    );

    render(<UserList />); // Render the UserList component

    // Wait for and assert that an alert role element (error message) is present in the DOM
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
