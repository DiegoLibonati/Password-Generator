import { screen } from "@testing-library/dom";

import type { OptionNumberProps } from "@/types/props";
import type { OptionNumberComponent } from "@/types/components";

import { OptionNumber } from "@/components/OptionNumber/OptionNumber";

const renderComponent = (props: OptionNumberProps): OptionNumberComponent => {
  const container = OptionNumber(props);
  document.body.appendChild(container);
  return container;
};

describe("OptionNumber Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const defaultProps: OptionNumberProps = {
    id: "test-number",
    label: "Test Number",
  };

  it("should render number input with correct attributes", () => {
    renderComponent(defaultProps);

    const label = screen.getByText("Test Number");
    const input = document.querySelector<HTMLInputElement>("#test-number");

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test-number");
    expect(label).toHaveClass("option-number__label");
    expect(input).toBeInTheDocument();
    expect(input?.type).toBe("number");
  });

  it("should apply additional className to container when provided", () => {
    const propsWithClass: OptionNumberProps = {
      ...defaultProps,
      className: "custom-container",
    };

    renderComponent(propsWithClass);

    const container = document.querySelector<HTMLDivElement>(".option-number");
    expect(container).toHaveClass("option-number", "custom-container");
  });

  it("should apply classNameLabel to label when provided", () => {
    const propsWithLabelClass: OptionNumberProps = {
      ...defaultProps,
      classNameLabel: "custom-label",
    };

    renderComponent(propsWithLabelClass);

    const label = screen.getByText("Test Number");
    expect(label).toHaveClass("option-number__label", "custom-label");
  });
});
