import type { PageElement } from "@/types/pages";

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

export const PasswordGeneratorPage = (): PageElement => {
  const mainElement = document.createElement("main");
  mainElement.className = "password-generator-page";

  mainElement.innerHTML = `
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

  const cardOptions =
    mainElement.querySelector<HTMLDivElement>(".card__options");
  const inputText =
    mainElement.querySelector<HTMLInputElement>(".card__form-input");
  const buttonGeneratePassword = mainElement.querySelector<HTMLButtonElement>(
    ".card__btn-generate-password"
  );

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

  if (cardOptions) {
    cardOptions.append(
      optionPasswordLength,
      optionContainCheckboxUppercase,
      optionContainCheckboxLowercase,
      optionContainNumbers,
      optionContainSymbols
    );
  }

  const handleGeneratePassword = (): void => {
    const inputTextLength =
      mainElement.querySelector<HTMLInputElement>("#inputTextLength");
    const checkBoxUpper =
      mainElement.querySelector<HTMLInputElement>("#checkBoxUpper");
    const checkBoxLower =
      mainElement.querySelector<HTMLInputElement>("#checkBoxLower");
    const checkBoxNumbers =
      mainElement.querySelector<HTMLInputElement>("#checkBoxNumbers");
    const checkBoxSymbols =
      mainElement.querySelector<HTMLInputElement>("#checkBoxSymbols");

    const characters: string[] = [];
    let newPassword = "";

    if (checkBoxUpper?.checked) characters.push(...allUpperCaseLetters);
    if (checkBoxLower?.checked) characters.push(...allLowerCaseLetters);
    if (checkBoxNumbers?.checked) characters.push(...allNumbers);
    if (checkBoxSymbols?.checked) characters.push(...allSymbols);

    if (characters.length === 0) {
      if (inputText) inputText.value = "Use any check.";
      return;
    }

    const passwordLength = parseInt(inputTextLength?.value ?? "12", 10);

    for (let i = 0; i < passwordLength; i++) {
      const index = getRandomIndex(characters);
      const character = characters[index];
      if (character) newPassword += character;
    }

    if (inputText) inputText.value = newPassword;
  };

  const handleCopyText = (): void => {
    if (!inputText) return;

    inputText.select();
    inputText.setSelectionRange(0, 99999);

    void navigator.clipboard.writeText(inputText.value);

    alert(`Copied the text: ${inputText.value}`);
  };

  if (inputText) {
    inputText.addEventListener("click", handleCopyText);
  }

  if (buttonGeneratePassword) {
    buttonGeneratePassword.addEventListener("click", handleGeneratePassword);
  }

  const main = mainElement as PageElement;

  main.cleanup = (): void => {
    if (inputText) {
      inputText.removeEventListener("click", handleCopyText);
    }
    if (buttonGeneratePassword) {
      buttonGeneratePassword.removeEventListener(
        "click",
        handleGeneratePassword
      );
    }
  };

  return main;
};
