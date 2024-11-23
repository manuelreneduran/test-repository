# Vitest Test Coverage Setup

This guide explains how to enable and check test coverage in a project using **Vitest**.

## Prerequisites

Make sure you have **Vitest** installed in your project. If not, install it by running:

```bash
npm install vitest --save-dev

```

Here's how the content can be formatted as a **`README.md`** file:

---

# Test Exercises

This document outlines various React component tests, what they cover, and searchable keywords for easy reference. Use this guide to find test examples quickly.

---

## 1. Counter Component

### **What It Tests**

- Default state of the counter.
- Button interactions to increment and decrement.
- State boundaries (e.g., preventing negative counts).

### **Keywords**

`state management`, `button click`, `state updates`, `default props`, `increment`, `decrement`

---

## 2. Form Component

### **What It Tests**

- Input field value updates on user input.
- Button disable state when fields are incomplete.
- Form submission behavior.
- Mocking console logs for testing.

### **Keywords**

`form testing`, `input change`, `button state`, `form submission`, `mocking console.log`

---

## 3. Dropdown Component

### **What It Tests**

- Default value in a dropdown (`Select an option`).
- Dropdown option selection.
- Callback execution on option selection.
- Rendering dynamic options in a dropdown.

### **Keywords**

`dropdown`, `default value`, `option selection`, `callback testing`, `dynamic options`

---

## 4. Toggle Component

### **What It Tests**

- Default toggle state (`ON` or `OFF`).
- Button click interaction toggling between states.

### **Keywords**

`toggle state`, `button click`, `state change`

---

## 5. Todo List Component

### **What It Tests**

- Adding new items to a list.
- Preventing invalid input (e.g., empty or whitespace-only items).
- Clearing input field after adding a todo.

### **Keywords**

`todo list`, `input validation`, `state updates`, `adding items`

---

## 6. Tabs Component

### **What It Tests**

- Default active tab and associated content.
- Switching tabs and displaying correct content.
- Accessibility attributes (`aria-selected`, `role="tab"`, `role="tabpanel"`).

### **Keywords**

`tabs`, `default active state`, `tab switching`, `aria-selected`, `role=tab`, `role=tabpanel`

---

## 7. Search Component with API Calls

### **What It Tests**

- Button disable state when input is empty.
- Mocking Axios for simulating API responses.
- Loading state while the API resolves.
- Error handling on API failure.

### **Keywords**

`search`, `mocking axios`, `API call`, `loading state`, `error state`

---

## 8. Modal Component

### **What It Tests**

- Conditional rendering of the modal (`isOpen` prop).
- Dismissing the modal on close button click.
- Accessibility attributes (`role="dialog"`, `aria-labelledby`, `aria-modal`).

### **Keywords**

`modal`, `conditional rendering`, `close button`, `role=dialog`, `aria-labelledby`, `aria-modal`

---

## 9. Pagination Component

### **What It Tests**

- Disable state of "Previous" and "Next" buttons at boundaries.
- Button interactions for navigating between pages.
- Callback execution for page changes.

### **Keywords**

`pagination`, `button state`, `page navigation`, `callback testing`

---

## 10. Shopping Cart Component

### **What It Tests**

- Adding items to the cart.
- Removing items from the cart.
- Calculating the total price based on cart contents.

### **Keywords**

`shopping cart`, `adding items`, `removing items`, `total price calculation`

---

## 11. Search Component (Loading State with MSW)

### **What It Tests**

- Mocking API delay using MSW's `ctx.delay`.
- Ensuring loading state is displayed during API resolution.
- Verifying correct behavior when the API response is delayed.

### **Keywords**

`mocking API`, `loading state`, `MSW`, `ctx.delay`, `async testing`

---

## 12. Search Component (Loading State with Axios Mocking)

### **What It Tests**

- Mocking Axios API calls for delayed responses.
- Testing the component's behavior during asynchronous state transitions (loading and result display).

### **Keywords**

`mocking axios`, `loading state`, `asynchronous testing`, `API delay`

---

### **Usage**

Search for specific testing topics using the keywords provided. For example:

- To learn how to mock Axios: `mocking axios`
- To explore how to test a loading state: `loading state`

---

If you'd like to expand this guide or have questions, feel free to contribute or reach out!
