export const getElements = () => ({
  inputText: document.getElementById("inputText") as HTMLInputElement,
  inputTextLength: document.getElementById(
    "inputTextLength"
  ) as HTMLInputElement,
  checkBoxUpper: document.getElementById("checkBoxUpper") as HTMLInputElement,
  checkBoxLower: document.getElementById("checkBoxLower") as HTMLInputElement,
  checkBoxNumbers: document.getElementById(
    "checkBoxNumbers"
  ) as HTMLInputElement,
  checkBoxSymbols: document.getElementById(
    "checkBoxSymbols"
  ) as HTMLInputElement,
  btnGeneratePassword: document.getElementById(
    "btnGeneratePassword"
  ) as HTMLButtonElement,
});
