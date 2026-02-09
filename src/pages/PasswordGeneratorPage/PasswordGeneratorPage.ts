import type { Page } from "@/types/pages";

import { OptionCheckbox } from "@/components/OptionCheckbox/OptionCheckbox";
import { OptionNumber } from "@/components/OptionNumber/OptionNumber";

import { getRandomIndex } from "@/helpers/getRandomIndex";

import {
  allLowerCaseLetters,
  allNumbers,
  allSymbols,
  allUpperCaseLetters,
} from "@/constants/vars";

import "@/pages/PasswordGeneratorPage/PasswordGeneratorPage.css";

export const PasswordGeneratorPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "password-generator-page";

  main.innerHTML = `
    <section class="card-wrapper">
        <article class="card">
            <form class="card__form">
                <input type="text" id="inputText" class="card__form-input" readonly>
            </form>
            <div class="card__options"></div>
            <div class="card__btns">
                <button type="button" id="btnGeneratePassword" aria-label="generate password" class="card__btn-generate-password">Generate Password</button>
            </div>
        </article>
    </section>
  `;

  const cardOptions = main.querySelector<HTMLDivElement>(".card__options")!;
  const inputText = main.querySelector<HTMLInputElement>(".card__form-input")!;
  const buttonGeneratePassword = main.querySelector<HTMLButtonElement>(
    ".card__btn-generate-password"
  )!;

  const optionPasswordLength = OptionNumber({
    id: "inputTextLength",
    label: "Password Length",
    classNameLabel: "card__options-label-password",
  });
  const optionContainCheckboxUppercase = OptionCheckbox({
    id: "checkBoxUpper",
    label: "Contain Uppercase Letters",
  });
  const optionContainCheckboxLowercase = OptionCheckbox({
    id: "checkBoxLower",
    label: "Contain Lowercase Letters",
  });
  const optionContainNumbers = OptionCheckbox({
    id: "checkBoxNumbers",
    label: "Contain Numbers",
  });
  const optionContainSymbols = OptionCheckbox({
    id: "checkBoxSymbols",
    label: "Contain Symbols",
  });

  cardOptions.append(
    optionPasswordLength,
    optionContainCheckboxUppercase,
    optionContainCheckboxLowercase,
    optionContainNumbers,
    optionContainSymbols
  );

  const handleGeneratePassword = (): void => {
    const inputTextLength =
      main.querySelector<HTMLInputElement>("#inputTextLength");
    const checkBoxUpper =
      main.querySelector<HTMLInputElement>("#checkBoxUpper");
    const checkBoxLower =
      main.querySelector<HTMLInputElement>("#checkBoxLower");
    const checkBoxNumbers =
      main.querySelector<HTMLInputElement>("#checkBoxNumbers");
    const checkBoxSymbols =
      main.querySelector<HTMLInputElement>("#checkBoxSymbols");

    const characters: string[] = [];
    let newPassword = "";

    if (checkBoxUpper?.checked) characters.push(...allUpperCaseLetters);
    if (checkBoxLower?.checked) characters.push(...allLowerCaseLetters);
    if (checkBoxNumbers?.checked) characters.push(...allNumbers);
    if (checkBoxSymbols?.checked) characters.push(...allSymbols);

    if (characters.length === 0) {
      inputText.value = "Use any check.";
      return;
    }

    const passwordLength = parseInt(inputTextLength?.value ?? "12", 10);

    for (let i = 0; i < passwordLength; i++) {
      const index = getRandomIndex(characters);
      const character = characters[index];
      if (character) newPassword += character;
    }

    inputText.value = newPassword;
  };

  const handleCopyText = (): void => {
    inputText.select();
    inputText.setSelectionRange(0, 99999);

    void navigator.clipboard.writeText(inputText.value);

    alert(`Copied the text: ${inputText.value}`);
  };

  inputText.addEventListener("click", handleCopyText);
  buttonGeneratePassword.addEventListener("click", handleGeneratePassword);

  main.cleanup = (): void => {
    inputText.removeEventListener("click", handleCopyText);
    buttonGeneratePassword.removeEventListener("click", handleGeneratePassword);
  };

  return main;
};
