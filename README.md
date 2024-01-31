# Password-Generator-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows the user to generate a random password. From this generated password you can choose: its length, if it contains uppercase letters, lowercase letters, numbers and/or symbols. It is a very customizable password generator.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/32`](https://www.diegolibonati.com.ar/#/project/32)

## Video

https://user-images.githubusercontent.com/99032604/199619042-c6829033-0643-4860-b194-438012d467c9.mp4

## Documentation

The `getRandomIndex()` function will pick a random number from an array so we can use that number as an index and extract some data from any array:

```
const getRandomIndex = (array: string[]) => {
  const randomNumber = Math.floor(Math.random() * array.length);

  return randomNumber;
};
```

The `copyText()` function is used to copy the password to the clipboard:

```
const copyText = () => {
  const showPassword = document.getElementById("showPassword");

  showPassword.select();
  showPassword.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(showPassword.value);

  alert(`Copied the text: ${showPassword.value}`);
};
```

The `addeventlistener` of generate password button:

```
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
```
