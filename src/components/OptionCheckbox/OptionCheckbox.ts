import type { OptionCheckboxProps } from "@/types/props";
import type { OptionCheckboxComponent } from "@/types/components";

import "@/components/OptionCheckbox/OptionCheckbox.css";

export const OptionCheckbox = ({
  id,
  label,
  className = "",
}: OptionCheckboxProps): OptionCheckboxComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = `option-checkbox ${className}`.trim();

  divRoot.innerHTML = `
    <label for="${id}" class="option-checkbox__label">${label}</label>
    <input type="checkbox" class="option-checkbox__check" value="off" id="${id}">
  `;

  return divRoot;
};
