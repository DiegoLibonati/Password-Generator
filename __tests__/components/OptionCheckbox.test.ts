import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { OptionCheckboxProps } from "@/types/props";
import type { OptionCheckboxComponent } from "@/types/components";

import { OptionCheckbox } from "@/components/OptionCheckbox/OptionCheckbox";

const renderComponent = (
  props: OptionCheckboxProps
): OptionCheckboxComponent => {
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

      expect(container).toHaveClass("option-checkbox");
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

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("should have correct CSS classes on elements", () => {
      const container = renderComponent({
        id: "test-checkbox",
        label: "Test Label",
      });

      const label = container.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );
      const checkbox = container.querySelector<HTMLInputElement>(
        ".option-checkbox__check"
      );

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

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox.id).toBe("my-checkbox");
    });

    it("should link label to checkbox with for attribute", () => {
      renderComponent({
        id: "linked-checkbox",
        label: "Linked Label",
      });

      const label = screen.getByText("Linked Label");
      expect(label).toHaveAttribute("for", "linked-checkbox");
    });

    it("should have default value of off", () => {
      renderComponent({
        id: "test-checkbox",
        label: "Label",
      });

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("value", "off");
    });

    it("should append custom className when provided", () => {
      const container = renderComponent({
        id: "test-checkbox",
        label: "Label",
        className: "custom-class",
      });

      expect(container).toHaveClass("option-checkbox", "custom-class");
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
      const user = userEvent.setup();

      renderComponent({
        id: "interactive-checkbox",
        label: "Interactive",
      });

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it("should toggle checkbox when label is clicked", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "label-click-checkbox",
        label: "Click Label",
      });

      const label = screen.getByText("Click Label");
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await user.click(label);
      expect(checkbox).toBeChecked();
    });

    it("should handle multiple clicks", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "multi-click",
        label: "Multi Click",
      });

      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

  describe("accessibility", () => {
    it("should have proper label-input relationship", () => {
      renderComponent({
        id: "a11y-checkbox",
        label: "Accessible Label",
      });

      const label = screen.getByText("Accessible Label");
      const checkbox = screen.getByRole("checkbox");

      expect(label).toHaveAttribute("for", checkbox.id);
    });

    it("should be keyboard focusable", () => {
      renderComponent({
        id: "keyboard-checkbox",
        label: "Keyboard",
      });

      const checkbox = screen.getByRole("checkbox");
      checkbox.focus();

      expect(document.activeElement).toBe(checkbox);
    });
  });
});
