import { OptionCheckbox } from "@src/components/OptionCheckbox/OptionCheckbox";
import { OptionNumber } from "@src/components/OptionNumber/OptionNumber";

import { getRandomIndex } from "@src/helpers/getRandomIndex";

import {
  allLowerCaseLetters,
  allNumbers,
  allSymbols,
  allUpperCaseLetters,
} from "@src/constants/vars";

import "@src/pages/PasswordGeneratorPage/PasswordGeneratorPage.css";

const handleGeneratePassword = () => {
  const inputText =
    document.querySelector<HTMLInputElement>(".card__form-input");
  const inputTextLength =
    document.querySelector<HTMLInputElement>("#inputTextLength");
  const checkBoxUpper =
    document.querySelector<HTMLInputElement>("#checkBoxUpper");
  const checkBoxLower =
    document.querySelector<HTMLInputElement>("#checkBoxLower");
  const checkBoxNumbers =
    document.querySelector<HTMLInputElement>("#checkBoxNumbers");
  const checkBoxSymbols =
    document.querySelector<HTMLInputElement>("#checkBoxSymbols");

  const characters: string[] = [];
  let newPassword: string = "";

  checkBoxUpper!.checked && characters.push(...allUpperCaseLetters);
  checkBoxLower!.checked && characters.push(...allLowerCaseLetters);
  checkBoxNumbers!.checked && characters.push(...allNumbers);
  checkBoxSymbols!.checked && characters.push(...allSymbols);

  if (characters.length === 0) return (inputText!.value = "Use any check.");

  const passwordLength = parseInt(inputTextLength!.value);

  for (let i = 0; i < passwordLength; i++) {
    const index = getRandomIndex<string>(characters);

    newPassword += characters[index];
  }

  inputText!.value = newPassword;
};

const copyText = () => {
  const inputText =
    document.querySelector<HTMLInputElement>(".card__form-input");

  inputText!.select();
  inputText!.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(inputText!.value);

  alert(`Copied the text: ${inputText!.value}`);
};

export const PasswordGeneratorPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "password-generator-page";

  main.innerHTML = `
    <section class="card-wrapper">

        <article class="card">

            <form class="card__form">
                <input type="text" id="inputText" class="card__form-input"></input>
            </form>

            <div class="card__options"></div>

            <div class="card__btns">
                <button type="button" id="btnGeneratePassword" aria-label="generate password" class="card__btn-generate-password">Generate Password</button>
            </div>
        </article>

    </section>
  `;

  const cardOptions = main.querySelector<HTMLDivElement>(".card__options");
  const inputText = main.querySelector<HTMLInputElement>(".card__form-input");
  const buttonGeneratePassword = main.querySelector<HTMLButtonElement>(
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

  cardOptions?.append(
    optionPasswordLength,
    optionContainCheckboxUppercase,
    optionContainCheckboxLowercase,
    optionContainNumbers,
    optionContainSymbols
  );

  inputText?.addEventListener("click", copyText);
  buttonGeneratePassword?.addEventListener("click", handleGeneratePassword);

  return main;
};
