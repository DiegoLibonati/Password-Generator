import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OptionNumberProps } from "@src/entities/props";

import { OptionNumber } from "@src/components/OptionNumber/OptionNumber";

type RenderComponent = {
  container: HTMLDivElement;
  props: OptionNumberProps;
};

const renderComponent = (props: OptionNumberProps): RenderComponent => {
  const container = OptionNumber(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("OptionNumber.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Test Label",
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toContain("option-number");
    });

    test("It should return HTMLDivElement", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Test Label",
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });

    test("It should render all required elements", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Test Label",
      };

      renderComponent(props);

      const label = screen.getByText("Test Label");
      const input = document.getElementById("test-number");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    test("It should have correct CSS classes", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Test Label",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");
      const input = document.querySelector(".option-number__input");

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should display the correct label", () => {
      const props: OptionNumberProps = {
        id: "my-number",
        label: "My Test Label",
      };

      renderComponent(props);

      const label = screen.getByText("My Test Label");

      expect(label).toBeInTheDocument();
      expect(label.textContent).toBe("My Test Label");
    });

    test("It should use correct id for input", () => {
      const props: OptionNumberProps = {
        id: "unique-id",
        label: "Label",
      };

      renderComponent(props);

      const input = document.getElementById("unique-id");

      expect(input).toBeInTheDocument();
      expect(input?.id).toBe("unique-id");
    });

    test("It should link label to input with htmlFor", () => {
      const props: OptionNumberProps = {
        id: "linked-input",
        label: "Linked Label",
      };

      renderComponent(props);

      const label = document.querySelector(
        ".option-number__label"
      ) as HTMLLabelElement;

      expect(label.htmlFor).toBe("linked-input");
      expect(label.getAttribute("for")).toBe("linked-input");
    });

    test("It should render input with correct type", () => {
      const props: OptionNumberProps = {
        id: "type-number",
        label: "Label",
      };

      renderComponent(props);

      const input = document.getElementById("type-number") as HTMLInputElement;

      expect(input.type).toBe("number");
    });
  });

  describe("ClassName Tests.", () => {
    test("It should have base class without additional className", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-number");
      expect(container.className).toBe("option-number ");
    });

    test("It should append additional className when provided", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        className: "custom-class",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-number");
      expect(container).toHaveClass("custom-class");
      expect(container.className).toContain("option-number custom-class");
    });

    test("It should handle multiple additional classes", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        className: "class-one class-two",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-number");
      expect(container).toHaveClass("class-one");
      expect(container).toHaveClass("class-two");
    });

    test("It should handle undefined className", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        className: undefined,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-number");
      expect(container.className).toBe("option-number ");
    });

    test("It should handle empty string className", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        className: "",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("option-number");
      expect(container.className).toBe("option-number ");
    });
  });

  describe("ClassNameLabel Tests.", () => {
    test("It should have base label class without additional classNameLabel", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label).toHaveClass("option-number__label");
      expect(label?.className).toBe("option-number__label ");
    });

    test("It should append additional classNameLabel when provided", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        classNameLabel: "custom-label-class",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label).toHaveClass("option-number__label");
      expect(label).toHaveClass("custom-label-class");
    });

    test("It should handle multiple additional label classes", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        classNameLabel: "label-class-one label-class-two",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label).toHaveClass("option-number__label");
      expect(label).toHaveClass("label-class-one");
      expect(label).toHaveClass("label-class-two");
    });

    test("It should handle undefined classNameLabel", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        classNameLabel: undefined,
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label).toHaveClass("option-number__label");
      expect(label?.className).toBe("option-number__label ");
    });

    test("It should handle empty string classNameLabel", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        classNameLabel: "",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label).toHaveClass("option-number__label");
      expect(label?.className).toBe("option-number__label ");
    });

    test("It should use nullish coalescing for classNameLabel", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label?.className).toContain("option-number__label");
    });
  });

  describe("Both ClassName Props Tests.", () => {
    test("It should handle both className and classNameLabel", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        className: "container-class",
        classNameLabel: "label-class",
      };

      const { container } = renderComponent(props);
      const label = document.querySelector(".option-number__label");

      expect(container).toHaveClass("option-number");
      expect(container).toHaveClass("container-class");
      expect(label).toHaveClass("option-number__label");
      expect(label).toHaveClass("label-class");
    });

    test("It should work independently with className and classNameLabel", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Label",
        className: "only-container",
      };

      const { container } = renderComponent(props);
      const label = document.querySelector(".option-number__label");

      expect(container).toHaveClass("only-container");
      expect(label).not.toHaveClass("only-container");
    });
  });

  describe("Label and Input Connection Tests.", () => {
    test("It should render label element", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Test",
      };

      renderComponent(props);

      const label = document.querySelector(
        ".option-number__label"
      ) as HTMLLabelElement;

      expect(label).toBeInstanceOf(HTMLLabelElement);
      expect(label.tagName).toBe("LABEL");
    });

    test("It should render input element", () => {
      const props: OptionNumberProps = {
        id: "test-number",
        label: "Test",
      };

      renderComponent(props);

      const input = document.querySelector(
        ".option-number__input"
      ) as HTMLInputElement;

      expect(input).toBeInstanceOf(HTMLInputElement);
      expect(input.tagName).toBe("INPUT");
    });

    test("It should connect label to input via for attribute", () => {
      const props: OptionNumberProps = {
        id: "connected-input",
        label: "Connected",
      };

      renderComponent(props);

      const label = document.querySelector(
        ".option-number__label"
      ) as HTMLLabelElement;
      const input = document.getElementById(
        "connected-input"
      ) as HTMLInputElement;

      expect(label.htmlFor).toBe(input.id);
    });
  });

  describe("Input Interaction Tests.", () => {
    test("It should accept numeric input", async () => {
      const props: OptionNumberProps = {
        id: "numeric-input",
        label: "Number",
      };

      renderComponent(props);

      const input = document.getElementById(
        "numeric-input"
      ) as HTMLInputElement;

      await user.type(input, "123");

      expect(input.value).toBe("123");
    });

    test("It should focus input when label is clicked", async () => {
      const props: OptionNumberProps = {
        id: "focus-input",
        label: "Focus Label",
      };

      renderComponent(props);

      const label = screen.getByText("Focus Label");
      const input = document.getElementById("focus-input") as HTMLInputElement;

      await user.click(label);

      expect(document.activeElement).toBe(input);
    });

    test("It should handle negative numbers", async () => {
      const props: OptionNumberProps = {
        id: "negative-input",
        label: "Negative",
      };

      renderComponent(props);

      const input = document.getElementById(
        "negative-input"
      ) as HTMLInputElement;

      await user.type(input, "-45");

      expect(input.value).toBe("-45");
    });

    test("It should handle decimal numbers", async () => {
      const props: OptionNumberProps = {
        id: "decimal-input",
        label: "Decimal",
      };

      renderComponent(props);

      const input = document.getElementById(
        "decimal-input"
      ) as HTMLInputElement;

      await user.type(input, "3.14");

      expect(input.value).toBe("3.14");
    });

    test("It should clear input value", async () => {
      const props: OptionNumberProps = {
        id: "clear-input",
        label: "Clear",
      };

      renderComponent(props);

      const input = document.getElementById("clear-input") as HTMLInputElement;

      await user.type(input, "100");
      expect(input.value).toBe("100");

      await user.clear(input);
      expect(input.value).toBe("");
    });
  });

  describe("Different IDs Tests.", () => {
    test("It should handle simple string id", () => {
      const props: OptionNumberProps = {
        id: "simple",
        label: "Simple",
      };

      renderComponent(props);

      const input = document.getElementById("simple");

      expect(input).toBeInTheDocument();
      expect(input?.id).toBe("simple");
    });

    test("It should handle id with dashes", () => {
      const props: OptionNumberProps = {
        id: "with-dashes-id",
        label: "With Dashes",
      };

      renderComponent(props);

      const input = document.getElementById("with-dashes-id");

      expect(input).toBeInTheDocument();
      expect(input?.id).toBe("with-dashes-id");
    });

    test("It should handle id with underscores", () => {
      const props: OptionNumberProps = {
        id: "with_underscores_id",
        label: "With Underscores",
      };

      renderComponent(props);

      const input = document.getElementById("with_underscores_id");

      expect(input).toBeInTheDocument();
      expect(input?.id).toBe("with_underscores_id");
    });

    test("It should handle numeric id", () => {
      const props: OptionNumberProps = {
        id: "input-123",
        label: "Numeric",
      };

      renderComponent(props);

      const input = document.getElementById("input-123");

      expect(input).toBeInTheDocument();
    });
  });

  describe("Multiple Inputs Tests.", () => {
    test("It should render multiple inputs independently", () => {
      const props1: OptionNumberProps = {
        id: "input-1",
        label: "Input 1",
      };

      const props2: OptionNumberProps = {
        id: "input-2",
        label: "Input 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const input1 = document.getElementById("input-1");
      const input2 = document.getElementById("input-2");
      const label1 = screen.getByText("Input 1");
      const label2 = screen.getByText("Input 2");

      expect(input1).toBeInTheDocument();
      expect(input2).toBeInTheDocument();
      expect(label1).toBeInTheDocument();
      expect(label2).toBeInTheDocument();
    });

    test("It should maintain separate values for multiple inputs", async () => {
      const props1: OptionNumberProps = {
        id: "value-1",
        label: "Value 1",
      };

      const props2: OptionNumberProps = {
        id: "value-2",
        label: "Value 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const input1 = document.getElementById("value-1") as HTMLInputElement;
      const input2 = document.getElementById("value-2") as HTMLInputElement;

      await user.type(input1, "10");
      await user.type(input2, "20");

      expect(input1.value).toBe("10");
      expect(input2.value).toBe("20");
    });

    test("It should have unique ids for each input", () => {
      const props1: OptionNumberProps = {
        id: "unique-1",
        label: "Unique 1",
      };

      const props2: OptionNumberProps = {
        id: "unique-2",
        label: "Unique 2",
      };

      renderComponent(props1);
      renderComponent(props2);

      const input1 = document.getElementById("unique-1");
      const input2 = document.getElementById("unique-2");

      expect(input1?.id).not.toBe(input2?.id);
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle empty string label", () => {
      const props: OptionNumberProps = {
        id: "empty-label",
        label: "",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe("");
    });

    test("It should handle special characters in label", () => {
      const props: OptionNumberProps = {
        id: "special-chars",
        label: "Label & Special <chars>",
      };

      renderComponent(props);

      const label = document.querySelector(".option-number__label");

      expect(label?.textContent).toContain("Label & Special");
    });

    test("It should handle long labels", () => {
      const longLabel =
        "This is a very long label that might wrap to multiple lines";
      const props: OptionNumberProps = {
        id: "long-label",
        label: longLabel,
      };

      renderComponent(props);

      const label = screen.getByText(longLabel);

      expect(label).toBeInTheDocument();
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have proper label-input relationship", () => {
      const props: OptionNumberProps = {
        id: "a11y-input",
        label: "Accessible Label",
      };

      renderComponent(props);

      const label = document.querySelector(
        ".option-number__label"
      ) as HTMLLabelElement;
      const input = document.getElementById("a11y-input") as HTMLInputElement;

      expect(label.htmlFor).toBe(input.id);
    });

    test("It should be keyboard accessible", async () => {
      const props: OptionNumberProps = {
        id: "keyboard-input",
        label: "Keyboard",
      };

      renderComponent(props);

      const input = document.getElementById(
        "keyboard-input"
      ) as HTMLInputElement;

      input.focus();
      expect(document.activeElement).toBe(input);
    });
  });
});
