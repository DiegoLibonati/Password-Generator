import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OptionCheckboxProps } from "@src/entities/props";

import { OptionCheckbox } from "@src/components/OptionCheckbox/OptionCheckbox";

type RenderComponent = {
  container: HTMLDivElement;
  props: OptionCheckboxProps;
};

const renderComponent = (props: OptionCheckboxProps): RenderComponent => {
  const container = OptionCheckbox(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("OptionCheckbox.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Test Label",
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toContain("option-checkbox");
    });

    test("It should return HTMLDivElement", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Test Label",
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });

    test("It should render all required elements", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Test Label",
      };

      renderComponent(props);

      const label = screen.getByText("Test Label");
      const checkbox =
        document.querySelector<HTMLInputElement>("#test-checkbox");

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });

    test("It should have correct CSS classes", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Test Label",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );
      const checkbox = document.querySelector<HTMLInputElement>(
        ".option-checkbox__check"
      );

      expect(label).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should display the correct label", () => {
      const props: OptionCheckboxProps = {
        id: "my-checkbox",
        label: "My Test Label",
      };

      renderComponent(props);

      const label = screen.getByText("My Test Label");

      expect(label).toBeInTheDocument();
      expect(label.textContent).toBe("My Test Label");
    });

    test("It should use correct id for checkbox", () => {
      const props: OptionCheckboxProps = {
        id: "unique-id",
        label: "Label",
      };

      renderComponent(props);

      const checkbox = document.querySelector<HTMLInputElement>("#unique-id");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox?.id).toBe("unique-id");
    });

    test("It should link label to checkbox with htmlFor", () => {
      const props: OptionCheckboxProps = {
        id: "linked-checkbox",
        label: "Linked Label",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );

      expect(label!.htmlFor).toBe("linked-checkbox");
      expect(label!.getAttribute("for")).toBe("linked-checkbox");
    });

    test("It should render checkbox with correct type", () => {
      const props: OptionCheckboxProps = {
        id: "type-checkbox",
        label: "Label",
      };

      renderComponent(props);

      const checkbox =
        document.querySelector<HTMLInputElement>("#type-checkbox");

      expect(checkbox!.type).toBe("checkbox");
    });

    test("It should have default value of 'off'", () => {
      const props: OptionCheckboxProps = {
        id: "value-checkbox",
        label: "Label",
      };

      renderComponent(props);

      const checkbox =
        document.querySelector<HTMLInputElement>("#value-checkbox");

      expect(checkbox!.value).toBe("off");
    });
  });

  describe("ClassName Tests.", () => {
    test("It should have base class without additional className", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Label",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-checkbox");
      expect(container.className).toBe("option-checkbox ");
    });

    test("It should append additional className when provided", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Label",
        className: "custom-class",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-checkbox");
      expect(container).toHaveClass("custom-class");
      expect(container.className).toContain("option-checkbox custom-class");
    });

    test("It should handle multiple additional classes", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Label",
        className: "class-one class-two",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-checkbox");
      expect(container).toHaveClass("class-one");
      expect(container).toHaveClass("class-two");
    });

    test("It should handle undefined className", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Label",
        className: undefined,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-checkbox");
      expect(container.className).toBe("option-checkbox ");
    });

    test("It should use nullish coalescing for className", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Label",
      };

      const { container } = renderComponent(props);

      expect(container.className).toContain("option-checkbox");
    });
  });

  describe("Label and Checkbox Connection Tests.", () => {
    test("It should render label element", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Test",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );

      expect(label).toBeInstanceOf(HTMLLabelElement);
      expect(label!.tagName).toBe("LABEL");
    });

    test("It should render input element", () => {
      const props: OptionCheckboxProps = {
        id: "test-checkbox",
        label: "Test",
      };

      renderComponent(props);

      const checkbox = document.querySelector<HTMLInputElement>(
        ".option-checkbox__check"
      );

      expect(checkbox).toBeInstanceOf(HTMLInputElement);
      expect(checkbox!.tagName).toBe("INPUT");
    });

    test("It should connect label to input via for attribute", () => {
      const props: OptionCheckboxProps = {
        id: "connected-checkbox",
        label: "Connected",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );
      const checkbox = document.querySelector<HTMLInputElement>(
        "#connected-checkbox"
      );

      expect(label!.htmlFor).toBe(checkbox!.id);
    });
  });

  describe("Checkbox Interaction Tests.", () => {
    test("It should toggle checkbox when clicked", async () => {
      const props: OptionCheckboxProps = {
        id: "interactive-checkbox",
        label: "Interactive",
      };

      renderComponent(props);

      const checkbox = document.querySelector<HTMLInputElement>(
        "#interactive-checkbox"
      );

      expect(checkbox!.checked).toBe(false);

      await user.click(checkbox!);

      expect(checkbox!.checked).toBe(true);
    });

    test("It should toggle checkbox when label is clicked", async () => {
      const props: OptionCheckboxProps = {
        id: "label-click-checkbox",
        label: "Click Label",
      };

      renderComponent(props);

      const label = screen.getByText("Click Label");
      const checkbox = document.querySelector<HTMLInputElement>(
        "#label-click-checkbox"
      );

      expect(checkbox!.checked).toBe(false);

      await user.click(label);

      expect(checkbox!.checked).toBe(true);
    });

    test("It should handle multiple clicks", async () => {
      const props: OptionCheckboxProps = {
        id: "multi-click-checkbox",
        label: "Multi Click",
      };

      renderComponent(props);

      const checkbox = document.querySelector<HTMLInputElement>(
        "#multi-click-checkbox"
      );

      await user.click(checkbox!);
      expect(checkbox!.checked).toBe(true);

      await user.click(checkbox!);
      expect(checkbox!.checked).toBe(false);

      await user.click(checkbox!);
      expect(checkbox!.checked).toBe(true);
    });
  });

  describe("Different IDs Tests.", () => {
    test("It should handle simple string id", () => {
      const props: OptionCheckboxProps = {
        id: "simple",
        label: "Simple",
      };

      renderComponent(props);

      const checkbox = document.querySelector<HTMLInputElement>("#simple");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox?.id).toBe("simple");
    });

    test("It should handle id with dashes", () => {
      const props: OptionCheckboxProps = {
        id: "with-dashes-id",
        label: "With Dashes",
      };

      renderComponent(props);

      const checkbox =
        document.querySelector<HTMLInputElement>("#with-dashes-id");

      expect(checkbox).toBeInTheDocument();
      expect(checkbox?.id).toBe("with-dashes-id");
    });

    test("It should handle id with underscores", () => {
      const props: OptionCheckboxProps = {
        id: "with_underscores_id",
        label: "With Underscores",
      };

      renderComponent(props);

      const checkbox = document.querySelector<HTMLInputElement>(
        "#with_underscores_id"
      );

      expect(checkbox).toBeInTheDocument();
      expect(checkbox?.id).toBe("with_underscores_id");
    });

    test("It should handle numeric id", () => {
      const props: OptionCheckboxProps = {
        id: "checkbox-123",
        label: "Numeric",
      };

      renderComponent(props);

      const checkbox =
        document.querySelector<HTMLInputElement>("#checkbox-123");

      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Multiple Checkboxes Tests.", () => {
    test("It should render multiple checkboxes independently", () => {
      const props1: OptionCheckboxProps = {
        id: "checkbox-1",
        label: "Checkbox 1",
      };

      const props2: OptionCheckboxProps = {
        id: "checkbox-2",
        label: "Checkbox 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const checkbox1 = document.querySelector<HTMLInputElement>("#checkbox-1");
      const checkbox2 = document.querySelector<HTMLInputElement>("#checkbox-2");
      const label1 = screen.getByText("Checkbox 1");
      const label2 = screen.getByText("Checkbox 2");

      expect(checkbox1).toBeInTheDocument();
      expect(checkbox2).toBeInTheDocument();
      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
    });

    test("It should maintain separate states for multiple checkboxes", async () => {
      const props1: OptionCheckboxProps = {
        id: "state-1",
        label: "State 1",
      };

      const props2: OptionCheckboxProps = {
        id: "state-2",
        label: "State 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const checkbox1 = document.querySelector<HTMLInputElement>("#state-1");
      const checkbox2 = document.querySelector<HTMLInputElement>("#state-2");

      await user.click(checkbox1!);

      expect(checkbox1!.checked).toBe(true);
      expect(checkbox2!.checked).toBe(false);
    });

    test("It should have unique ids for each checkbox", () => {
      const props1: OptionCheckboxProps = {
        id: "unique-1",
        label: "Unique 1",
      };

      const props2: OptionCheckboxProps = {
        id: "unique-2",
        label: "Unique 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const checkbox1 = document.querySelector<HTMLInputElement>("#unique-1");
      const checkbox2 = document.querySelector<HTMLInputElement>("#unique-2");

      expect(checkbox1?.id).not.toBe(checkbox2?.id);
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle empty string label", () => {
      const props: OptionCheckboxProps = {
        id: "empty-label",
        label: "",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );

      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe("");
    });

    test("It should handle special characters in label", () => {
      const props: OptionCheckboxProps = {
        id: "special-chars",
        label: "Label & Special <chars>",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );

      expect(label?.textContent).toContain("Label & Special");
    });

    test("It should handle long labels", () => {
      const longLabel =
        "This is a very long label that might wrap to multiple lines";
      const props: OptionCheckboxProps = {
        id: "long-label",
        label: longLabel,
      };

      renderComponent(props);

      const label = screen.getByText(longLabel);

      expect(label).toBeInTheDocument();
    });

    test("It should handle empty string className", () => {
      const props: OptionCheckboxProps = {
        id: "empty-class",
        label: "Label",
        className: "",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-checkbox");
      expect(container.className).toBe("option-checkbox ");
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have proper label-input relationship", () => {
      const props: OptionCheckboxProps = {
        id: "a11y-checkbox",
        label: "Accessible Label",
      };

      renderComponent(props);

      const label = document.querySelector<HTMLLabelElement>(
        ".option-checkbox__label"
      );
      const checkbox =
        document.querySelector<HTMLInputElement>("#a11y-checkbox");

      expect(label!.htmlFor).toBe(checkbox!.id);
    });

    test("It should be keyboard accessible", async () => {
      const props: OptionCheckboxProps = {
        id: "keyboard-checkbox",
        label: "Keyboard",
      };

      renderComponent(props);

      const checkbox =
        document.querySelector<HTMLInputElement>("#keyboard-checkbox");

      checkbox!.focus();
      expect(document.activeElement).toBe(checkbox);
    });
  });
});
