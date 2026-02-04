import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import type { OptionNumberProps } from "@/types/props";

import { OptionNumber } from "@/components/OptionNumber/OptionNumber";

const renderComponent = (props: OptionNumberProps): HTMLDivElement => {
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

      expect(container.className).toContain("option-number");
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

      const input = document.querySelector<HTMLInputElement>("#test-number");

      expect(input).toBeInTheDocument();
      expect(input?.type).toBe("number");
    });

    it("should have correct CSS classes on elements", () => {
      renderComponent({
        id: "test-number",
        label: "Test Label",
      });

      const label = document.querySelector(".option-number__label");
      const input = document.querySelector(".option-number__input");

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

      const input = document.querySelector<HTMLInputElement>("#my-number");

      expect(input?.id).toBe("my-number");
    });

    it("should link label to input with for attribute", () => {
      renderComponent({
        id: "linked-input",
        label: "Linked Label",
      });

      const label = document.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );

      expect(label?.htmlFor).toBe("linked-input");
    });

    it("should append custom className when provided", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Label",
        className: "custom-class",
      });

      expect(container).toHaveClass("option-number");
      expect(container).toHaveClass("custom-class");
    });

    it("should append custom classNameLabel when provided", () => {
      renderComponent({
        id: "test-number",
        label: "Label",
        classNameLabel: "custom-label-class",
      });

      const label = document.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );

      expect(label).toHaveClass("option-number__label");
      expect(label).toHaveClass("custom-label-class");
    });

    it("should handle undefined className", () => {
      const container = renderComponent({
        id: "test-number",
        label: "Label",
      });

      expect(container).toHaveClass("option-number");
    });

    it("should handle undefined classNameLabel", () => {
      renderComponent({
        id: "test-number",
        label: "Label",
      });

      const label = document.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );

      expect(label).toHaveClass("option-number__label");
    });
  });

  describe("interaction", () => {
    it("should accept numeric input", async () => {
      renderComponent({
        id: "numeric-input",
        label: "Number",
      });

      const input = document.querySelector<HTMLInputElement>("#numeric-input");

      await user.type(input!, "123");

      expect(input?.value).toBe("123");
    });

    it("should focus input when label is clicked", async () => {
      renderComponent({
        id: "focus-input",
        label: "Focus Label",
      });

      const label = screen.getByText("Focus Label");
      const input = document.querySelector<HTMLInputElement>("#focus-input");

      await user.click(label);

      expect(document.activeElement).toBe(input);
    });

    it("should handle negative numbers", async () => {
      renderComponent({
        id: "negative-input",
        label: "Negative",
      });

      const input = document.querySelector<HTMLInputElement>("#negative-input");

      await user.type(input!, "-45");

      expect(input?.value).toBe("-45");
    });

    it("should clear input value", async () => {
      renderComponent({
        id: "clear-input",
        label: "Clear",
      });

      const input = document.querySelector<HTMLInputElement>("#clear-input");

      await user.type(input!, "100");
      expect(input?.value).toBe("100");

      await user.clear(input!);
      expect(input?.value).toBe("");
    });
  });

  describe("accessibility", () => {
    it("should have proper label-input relationship", () => {
      renderComponent({
        id: "a11y-input",
        label: "Accessible Label",
      });

      const label = document.querySelector<HTMLLabelElement>(
        ".option-number__label"
      );
      const input = document.querySelector<HTMLInputElement>("#a11y-input");

      expect(label?.htmlFor).toBe(input?.id);
    });

    it("should be keyboard focusable", () => {
      renderComponent({
        id: "keyboard-input",
        label: "Keyboard",
      });

      const input = document.querySelector<HTMLInputElement>("#keyboard-input");

      input?.focus();

      expect(document.activeElement).toBe(input);
    });
  });
});
