import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import type { OptionCheckboxProps } from "@/types/props";

import { OptionCheckbox } from "@/components/OptionCheckbox/OptionCheckbox";

const renderComponent = (props: OptionCheckboxProps): HTMLDivElement => {
  const container = OptionCheckbox(props);
  document.body.appendChild(container);
  return container;
};

describe("OptionCheckbox", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("render", () => {
    it("should create a div element", () => {
      const container = renderComponent({
        id: "test-checkbox",
        label: "Test Label",
      });

      expect(container.tagName).toBe("DIV");
    });

    it("should have option-checkbox class", () => {
      const container = renderComponent({
        id: "test-checkbox",
        label: "Test Label",
      });

      expect(container.className).toContain("option-checkbox");
    });

    it("should render label element", () => {
      renderComponent({
        id: "test-checkbox",
        label: "Test Label",
      });

      const label = screen.getByText("Test Label");

      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");
    });

    it("should render checkbox input", () => {
      renderComponent({
        id: "test-checkbox",
        label: "Test Label",
      });

      const checkbox =
        document.querySelector<HTMLInputElement>("#test-checkbox");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox?.type).toBe("checkbox");
    });

    it("should have correct CSS classes on elements", () => {
      renderComponent({
        id: "test-checkbox",
        label: "Test Label",
      });

      const label = document.querySelector(".option-checkbox__label");
      const checkbox = document.querySelector(".option-checkbox__check");

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("props", () => {
    it("should set correct id on checkbox", () => {
      renderComponent({
        id: "my-checkbox",
        label: "Label",
      });

      const checkbox = document.querySelector<HTMLInputElement>("#my-checkbox");

      expect(checkbox?.id).toBe("my-checkbox");
    });

    it("should link label to checkbox with for attribute", () => {
      renderComponent({
        id: "linked-checkbox",
        label: "Linked Label",
      });

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );

      expect(label?.htmlFor).toBe("linked-checkbox");
    });

    it("should have default value of off", () => {
      renderComponent({
        id: "test-checkbox",
        label: "Label",
      });

      const checkbox =
        document.querySelector<HTMLInputElement>("#test-checkbox");

      expect(checkbox?.value).toBe("off");
    });

    it("should append custom className when provided", () => {
      const container = renderComponent({
        id: "test-checkbox",
        label: "Label",
        className: "custom-class",
      });

      expect(container).toHaveClass("option-checkbox");
      expect(container).toHaveClass("custom-class");
    });

    it("should handle undefined className", () => {
      const container = renderComponent({
        id: "test-checkbox",
        label: "Label",
      });

      expect(container).toHaveClass("option-checkbox");
    });
  });

  describe("interaction", () => {
    it("should toggle checkbox when clicked", async () => {
      renderComponent({
        id: "interactive-checkbox",
        label: "Interactive",
      });

      const checkbox = document.querySelector<HTMLInputElement>(
        "#interactive-checkbox"
      );

      expect(checkbox?.checked).toBe(false);

      await user.click(checkbox!);

      expect(checkbox?.checked).toBe(true);
    });

    it("should toggle checkbox when label is clicked", async () => {
      renderComponent({
        id: "label-click-checkbox",
        label: "Click Label",
      });

      const label = screen.getByText("Click Label");
      const checkbox = document.querySelector<HTMLInputElement>(
        "#label-click-checkbox"
      );

      expect(checkbox?.checked).toBe(false);

      await user.click(label);

      expect(checkbox?.checked).toBe(true);
    });

    it("should handle multiple clicks", async () => {
      renderComponent({
        id: "multi-click",
        label: "Multi Click",
      });

      const checkbox = document.querySelector<HTMLInputElement>("#multi-click");

      await user.click(checkbox!);
      expect(checkbox?.checked).toBe(true);

      await user.click(checkbox!);
      expect(checkbox?.checked).toBe(false);

      await user.click(checkbox!);
      expect(checkbox?.checked).toBe(true);
    });
  });

  describe("accessibility", () => {
    it("should have proper label-input relationship", () => {
      renderComponent({
        id: "a11y-checkbox",
        label: "Accessible Label",
      });

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );
      const checkbox =
        document.querySelector<HTMLInputElement>("#a11y-checkbox");

      expect(label?.htmlFor).toBe(checkbox?.id);
    });

    it("should be keyboard focusable", () => {
      renderComponent({
        id: "keyboard-checkbox",
        label: "Keyboard",
      });

      const checkbox =
        document.querySelector<HTMLInputElement>("#keyboard-checkbox");

      checkbox?.focus();

      expect(document.activeElement).toBe(checkbox);
    });
  });
});
