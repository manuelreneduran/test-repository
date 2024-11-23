import { render, screen } from "@testing-library/react";
import { Tabs } from "../components/Tabs";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

/*
Tests for the Tabs component:
- Ensure the first tab is active by default.
- Verify that clicking a tab changes the active tab and displays the correct content.
- Ensure only one tab is active at any given time.
- Check accessibility roles to ensure compliance with ARIA standards.
*/

const tabs = [
  { label: "Home", content: <div>Home</div> },
  { label: "About", content: <div>About</div> },
  { label: "Resume", content: <div>Resume</div> },
];

describe("Tabs", () => {
  it("sets the first tab active by default", () => {
    // Render the Tabs component with the predefined tabs array.
    render(<Tabs tabs={tabs} />);

    // Find the currently active tab using its ARIA "selected" attribute.
    const activeTab = screen.getByRole("tab", { selected: true });

    // Verify that the first tab ("Home") is active by default.
    expect(activeTab).toHaveTextContent("Home");
  });

  it("changes tabs when clicked and displays correct content", async () => {
    // Render the Tabs component.
    render(<Tabs tabs={tabs} />);

    // Simulate a user click on the "About" tab.
    const aboutTab = screen.getByRole("tab", { name: "About" });
    await userEvent.click(aboutTab);

    // Verify that the "About" tab is now marked as active.
    expect(aboutTab).toHaveAttribute("aria-selected", "true");

    // Verify that the content associated with the "About" tab is displayed.
    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toHaveTextContent("About");
  });

  it("only keeps one tab active at a time", async () => {
    // Render the Tabs component.
    render(<Tabs tabs={tabs} />);

    // Find all tabs that are currently marked as active.
    const activeTabs = screen.getAllByRole("tab", { selected: true });

    // Verify that only one tab is active at any given time.
    expect(activeTabs.length).toEqual(1);
  });

  it("ensures all tabs have 'role=tab' and the container has 'role=tablist'", () => {
    // Render the Tabs component.
    render(<Tabs tabs={tabs} />);

    // Verify the container has the ARIA "tablist" role.
    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();

    // Verify all rendered tabs have the ARIA "tab" role.
    const renderedTabs = screen.getAllByRole("tab");
    expect(renderedTabs.length).toEqual(tabs.length);
  });
});
