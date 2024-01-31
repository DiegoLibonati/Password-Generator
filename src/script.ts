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
  showPassword,
} from "./helpers/elements";

let newPassword: string = "";

btnGeneratePassword.addEventListener("click", () => {
  let characters: string[] = [];

  checkBoxUpper.checked && characters.push(...allUpperCaseLetters);
  checkBoxLower.checked && characters.push(...allLowerCaseLetters);
  checkBoxNumbers.checked && characters.push(...allNumbers);
  checkBoxSymbols.checked && characters.push(...allSymbols);

  if (characters.length === 0) return (showPassword.value = "Use any check");

  newPassword = "";

  const passwordLength = parseInt(inputText.value);

  for (let i = 0; i < passwordLength; i++) {
    const index = getRandomIndex(characters);

    newPassword += characters[index];
  }

  showPassword.value = newPassword;
});

const getRandomIndex = (array: string[]) => {
  const randomNumber = Math.floor(Math.random() * array.length);

  return randomNumber;
};

const copyText = () => {
  showPassword.select();
  showPassword.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(showPassword.value);

  alert(`Copied the text: ${showPassword.value}`);
};

showPassword.addEventListener("click", copyText);
