import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { OptionNumberProps } from "@/types/props";
import type { OptionNumberComponent } from "@/types/components";

import { OptionNumber } from "@/components/OptionNumber/OptionNumber";

const renderComponent = (props: OptionNumberProps): OptionNumberComponent => {
  const container = OptionNumber(props);
  document.body.appendChild(container);
  return container;
};

describe("OptionNumber", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("render", () => {
    it("should create a div element", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Test Label",
      });

      expect(container.tagName).toBe("DIV");
    });

    it("should have option-number class", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Test Label",
      });

      expect(container).toHaveClass("option-number");
    });

    it("should render label element", () => {
      renderComponent({
        id: "test-number",
        label: "Test Label",
      });

      const label = screen.getByText("Test Label");
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");
    });

    it("should render number input", () => {
      renderComponent({
        id: "test-number",
        label: "Test Label",
      });

      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "number");
    });

    it("should have correct CSS classes on elements", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Test Label",
      });

      const label = container.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );
      const input = container.querySelector<HTMLInputElement>(
        ".option-number__input"
      );

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  describe("props", () => {
    it("should set correct id on input", () => {
      renderComponent({
        id: "my-number",
        label: "Label",
      });

      const input = screen.getByRole("spinbutton");
      expect(input.id).toBe("my-number");
    });

    it("should link label to input with for attribute", () => {
      renderComponent({
        id: "linked-input",
        label: "Linked Label",
      });

      const label = screen.getByText("Linked Label");
      expect(label).toHaveAttribute("for", "linked-input");
    });

    it("should append custom className when provided", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Label",
        className: "custom-class",
      });

      expect(container).toHaveClass("option-number", "custom-class");
    });

    it("should append custom classNameLabel when provided", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Label",
        classNameLabel: "custom-label-class",
      });

      const label = container.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );

      expect(label).toHaveClass("option-number__label", "custom-label-class");
    });

    it("should handle undefined className", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Label",
      });

      expect(container).toHaveClass("option-number");
    });

    it("should handle undefined classNameLabel", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Label",
      });

      const label = container.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );

      expect(label).toHaveClass("option-number__label");
    });
  });

  describe("interaction", () => {
    it("should accept numeric input", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "numeric-input",
        label: "Number",
      });

      const input = screen.getByRole("spinbutton");
      await user.type(input, "123");

      expect(input).toHaveValue(123);
    });

    it("should focus input when label is clicked", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "focus-input",
        label: "Focus Label",
      });

      const label = screen.getByText("Focus Label");
      const input = screen.getByRole("spinbutton");

      await user.click(label);

      expect(document.activeElement).toBe(input);
    });

    it("should handle negative numbers", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "negative-input",
        label: "Negative",
      });

      const input = screen.getByRole("spinbutton");
      await user.type(input, "-45");

      expect(input).toHaveValue(-45);
    });

    it("should clear input value", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "clear-input",
        label: "Clear",
      });

      const input = screen.getByRole("spinbutton");

      await user.type(input, "100");
      expect(input).toHaveValue(100);

      await user.clear(input);
      expect(input).toHaveValue(null);
    });
  });

  describe("accessibility", () => {
    it("should have proper label-input relationship", () => {
      renderComponent({
        id: "a11y-input",
        label: "Accessible Label",
      });

      const label = screen.getByText("Accessible Label");
      const input = screen.getByRole("spinbutton");

      expect(label).toHaveAttribute("for", input.id);
    });

    it("should be keyboard focusable", () => {
      renderComponent({
        id: "keyboard-input",
        label: "Keyboard",
      });

      const input = screen.getByRole("spinbutton");
      input.focus();

      expect(document.activeElement).toBe(input);
    });
  });
});
