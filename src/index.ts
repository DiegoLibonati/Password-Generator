import { getRandomIndex } from "./helpers/getRandomIndex";
import {
  allLowerCaseLetters,
  allNumbers,
  allSymbols,
  allUpperCaseLetters,
} from "./constants/constants";
import {
  btnGeneratePassword,
  checkBoxLower,
  checkBoxNumbers,
  checkBoxSymbols,
  checkBoxUpper,
  inputText,
  inputTextLength,
} from "./constants/elements";

const handleGeneratePassword = () => {
  const characters: string[] = [];
  let newPassword: string = "";

  checkBoxUpper.checked && characters.push(...allUpperCaseLetters);
  checkBoxLower.checked && characters.push(...allLowerCaseLetters);
  checkBoxNumbers.checked && characters.push(...allNumbers);
  checkBoxSymbols.checked && characters.push(...allSymbols);

  if (characters.length === 0) return (inputText.value = "Use any check.");

  const passwordLength = parseInt(inputTextLength.value);

  for (let i = 0; i < passwordLength; i++) {
    const index = getRandomIndex<string>(characters);

    newPassword += characters[index];
  }

  inputText.value = newPassword;
};

const copyText = () => {
  inputText.select();
  inputText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(inputText.value);

  alert(`Copied the text: ${inputText.value}`);
};

const onInit = () => {
  btnGeneratePassword.addEventListener("click", handleGeneratePassword);
  inputText.addEventListener("click", copyText);
};

document.addEventListener("DOMContentLoaded", onInit);
