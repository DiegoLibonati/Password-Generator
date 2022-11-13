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

## Description

I made a web page that allows the user to generate a random password. From this generated password you can choose: its length, if it contains uppercase letters, lowercase letters, numbers and/or symbols. It is a very customizable password generator.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![password-generator-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/password-0.jpg)

![password-generator-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/password-1.jpg)

![password-generator-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/password-2.jpg)

![password-generator-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/password-3.jpg)

![password-generator-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/password-4.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Password%20Generator%20Page`

## Video

https://user-images.githubusercontent.com/99032604/199619042-c6829033-0643-4860-b194-438012d467c9.mp4

## Documentation

The `randomSelectNumberForArrays()` function will pick a random number from an array so we can use that number as an index and extract some data from any array:

```
const randomSelectNumberForArrays = (array) => {
  const randomNumber = Math.floor(Math.random() * array.length);

  return randomNumber;
};
```

The `createPassword()` function will create a password depending on the options that the user has chosen, as well as respecting the length that the user also wants:

```
const createPassword = () => {
  allArrays = [];
  const inputTextValue = parseInt(inputText.value);

  if (newPassword.length >= inputTextValue) {
    console.log("Nueva contraseña generada con exito");
  } else {
    if (
      checkBoxUpper.checked &&
      upperWasUsed == false &&
      newPassword.length < inputTextValue
    ) {
      newPassword += generateCharacter(allUpperCaseLetters);
      upperWasUsed = true;
      lowerWasUsed = false;
      numberWasUsed = false;
      symbolsWasUsed = false;
    }
    if (
      checkBoxLower.checked &&
      lowerWasUsed == false &&
      newPassword.length < inputTextValue
    ) {
      newPassword += generateCharacter(allLowerCaseLetters);
      upperWasUsed = true;
      lowerWasUsed = true;
      numberWasUsed = false;
      symbolsWasUsed = false;
    }
    if (
      checkBoxNumbers.checked &&
      numberWasUsed == false &&
      newPassword.length < inputTextValue
    ) {
      newPassword += generateCharacter(allNumbers);
      upperWasUsed = true;
      lowerWasUsed = true;
      numberWasUsed = true;
      symbolsWasUsed = false;
    }
    if (
      checkBoxSymbols.checked &&
      symbolsWasUsed == false &&
      newPassword.length < inputTextValue
    ) {
      newPassword += generateCharacter(allSymbols);
      upperWasUsed = true;
      lowerWasUsed = true;
      numberWasUsed = true;
      symbolsWasUsed = true;
    }
  }

  upperWasUsed = false;
  lowerWasUsed = false;
  numberWasUsed = false;
  symbolsWasUsed = false;

  return sortFinalPassword(newPassword);
};
```

The `generateCharacter()` function is in charge of grabbing some data from any array:

```
const generateCharacter = (array) => {
  const randomNumber = randomSelectNumberForArrays(array);

  const newCharacter = array[randomNumber];

  return newCharacter;
};
```

This function `sortFinalPassword()` is in charge of mixing the generated password to make it more random:

```
const sortFinalPassword = (password) => {
  const newPasswordArray = Array.from(password);

  const finalNewPassword = newPasswordArray
    .sort((a, b) => 0.5 - Math.random())
    .toString()
    .split(",")
    .join("");

  return finalNewPassword;
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
