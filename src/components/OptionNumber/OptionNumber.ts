import { OptionNumberProps } from "@src/entities/props";

import "@src/components/OptionNumber/OptionNumber.css";

export const OptionNumber = ({
  id,
  label,
  className,
  classNameLabel,
}: OptionNumberProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = `option-number ${className ?? ""}`;

  divRoot.innerHTML = `
      <label for="${id}" class="option-number__label ${
    classNameLabel ?? ""
  }">${label}</label>
      <input type="number" id="${id}" class="option-number__input">
    `;

  return divRoot;
};
