import { screen } from "@testing-library/dom";

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

describe("OptionCheckbox Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: OptionCheckboxProps = {
    id: "test-checkbox",
    label: "Test Option",
  };

  it("should render checkbox with correct attributes", () => {
    renderComponent(defaultProps);

    const label = screen.getByText("Test Option");
    const checkbox = document.querySelector<HTMLInputElement>("#test-checkbox");

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox?.type).toBe("checkbox");
    expect(checkbox).toHaveAttribute("value", "off");
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: OptionCheckboxProps = {
      ...defaultProps,
      className: "custom-class",
    };

    renderComponent(propsWithClass);

    const container =
      document.querySelector<HTMLDivElement>(".option-checkbox");
    expect(container).toHaveClass("option-checkbox", "custom-class");
  });

  it("should not have extra className when not provided", () => {
    renderComponent(defaultProps);

    const container =
      document.querySelector<HTMLDivElement>(".option-checkbox");
    expect(container?.className.trim()).toBe("option-checkbox");
  });
});
