const inputText = document.getElementById("inputText");
const showPassword = document.getElementById("showPassword");
const checkBoxUpper = document.getElementById("checkBoxUpper");
const checkBoxLower = document.getElementById("checkBoxLower");
const checkBoxNumbers = document.getElementById("checkBoxNumbers");
const checkBoxSymbols = document.getElementById("checkBoxSymbols");
const btnGeneratePassword = document.getElementById("btnGeneratePassword");

const allUpperCaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const allLowerCaseLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const allNumbers = ["0", "1", "2", "3","4","5","6","7","8", "9"];
const allSymbols = ["!", "#", "$","%","&","/", "(", ")", "=", "?", "¡"];

let allArrays = [];
let newPassword = "";

let upperWasUsed = false;
let lowerWasUsed = false;
let numberWasUsed = false;
let symbolsWasUsed = false;

btnGeneratePassword.addEventListener("click", (e)=>{

    if (inputText.value.split(" ").join("") == ""){
        showPassword.value = "I cant detect checkbox checkeds"
    } else {
        newPassword = "";

        const inputTextValue = parseInt(inputText.value);
    
        for (let i = 0; i < inputTextValue; i++){
    
            showPassword.value = createPassword();
    
        }
    }


});

const randomSelectNumberForArrays = (array) => {

    const randomNumber = Math.floor(Math.random() * array.length);

    return randomNumber;

}

const createPassword = () =>{

    allArrays = [];
    const inputTextValue = parseInt(inputText.value);

    if (newPassword.length >= inputTextValue){
        console.log("Nueva contraseña generada con exito");
    } else {

        if (checkBoxUpper.checked && upperWasUsed == false && newPassword.length < inputTextValue) {
            newPassword += generateCharacter(allUpperCaseLetters);
            upperWasUsed = true;
            lowerWasUsed = false;
            numberWasUsed = false;
            symbolsWasUsed = false;
        } 
        if (checkBoxLower.checked && lowerWasUsed == false && newPassword.length < inputTextValue) {
            newPassword += generateCharacter(allLowerCaseLetters);
            upperWasUsed = true;
            lowerWasUsed = true;
            numberWasUsed = false;
            symbolsWasUsed = false;
        } 
        if (checkBoxNumbers.checked && numberWasUsed == false && newPassword.length < inputTextValue) {
            newPassword += generateCharacter(allNumbers);
            upperWasUsed = true;
            lowerWasUsed = true;
            numberWasUsed = true;
            symbolsWasUsed = false;
        } 
        if (checkBoxSymbols.checked && symbolsWasUsed == false && newPassword.length < inputTextValue) {
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


}

const generateCharacter = (array) =>{


    const randomNumber = randomSelectNumberForArrays(array);

    const newCharacter = array[randomNumber];
    
    return newCharacter;


}

const sortFinalPassword = (password) => {

    const newPasswordArray = Array.from(password);

    const finalNewPassword = newPasswordArray.sort((a, b) => 0.5 - Math.random()).toString().split(",").join("");

    return finalNewPassword;

}

const copyText = () =>{

    const showPassword = document.getElementById("showPassword");

    showPassword.select();
    showPassword.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(showPassword.value);

    alert(`Copied the text: ${showPassword.value}`);

}

showPassword.addEventListener("click", copyText);