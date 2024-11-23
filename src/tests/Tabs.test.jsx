import { render, screen } from "@testing-library/react";
import { Tabs } from "../components/Tabs";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

/*
Test that the first tab is active by default.
Test that clicking on a tab changes the active tab and displays the correct content.
Test that only one tab is marked as active at a time.
Test accessibility roles: ensure all tabs have role="tab" and the container has role="tablist".
*/

const tabs = [
  { label: "Home", content: <div>Home</div> },
  { label: "About", content: <div>About</div> },
  { label: "Resume", content: <div>Resume</div> },
];
describe("Tabs", () => {
  it("sets the first tab active by default", () => {
    render(<Tabs tabs={tabs} />);

    const activeTab = screen.getByRole("tab", { selected: true });
    expect(activeTab).toHaveTextContent("Home");
  });
  it("changes tabs when clicked and displays correct content", async () => {
    render(<Tabs tabs={tabs} />);

    // Click on the "About" tab
    const aboutTab = screen.getByRole("tab", { name: "About" });
    await userEvent.click(aboutTab);

    // Verify that the "About" tab is now active
    expect(aboutTab).toHaveAttribute("aria-selected", "true");

    // Verify the associated tabpanel content is displayed
    const tabPanel = screen.getByRole("tabpanel");
    expect(tabPanel).toHaveTextContent("About");
  });

  it("only keeps one tab active at a time", async () => {
    render(<Tabs tabs={tabs} />);

    const activeTabs = screen.getAllByRole("tab", { selected: true });

    expect(activeTabs.length).toEqual(1);
  });

  it("ensures all tabs have 'role=tab' and the container has 'role=tablist'", () => {
    render(<Tabs tabs={tabs} />);

    const tablist = screen.getByRole("tablist");
    const renderedTabs = screen.getAllByRole("tab");

    expect(tablist).toBeInTheDocument();
    expect(renderedTabs.length).toEqual(tabs.length);
  });
});
