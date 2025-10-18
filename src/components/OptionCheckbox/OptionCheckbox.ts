import { OptionCheckboxProps } from "@src/entities/props";

import "@src/components/OptionCheckbox/OptionCheckbox.css";

export const OptionCheckbox = ({
  id,
  label,
  className,
}: OptionCheckboxProps): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = `option-checkbox ${className ?? ""}`;

  divRoot.innerHTML = `
    <label for="${id}" class="option-checkbox__label">${label}</label>
    <input type="checkbox" class="option-checkbox__check" value="off" id="${id}">
  `;

  return divRoot;
};
