// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Meshari`;

// Part 5 Handle Backspace

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Word
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButten = document.querySelector(".hint");
getHintButten.addEventListener("click", getHint);

// console.log(wordToGuess);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  // Create Main Try Div
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i != 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numberOfLetters; j++) {
      const inputs = document.createElement("input");
      inputs.type = "text";
      inputs.id = `guess-${i}-letter-${j}`;
      inputs.setAttribute("maxlength", "1");
      tryDiv.append(inputs);
    }

    inputsContainer.append(tryDiv);
  }
  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      // Convert Input To Uppercase
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextIndex = inputs[index + 1];
      if (nextIndex) nextIndex.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target);
      console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guesBtn = document.querySelector(".check");
guesBtn.addEventListener("click", handleGuesses);

console.log(wordToGuess);

function handleGuesses() {
  let successGuess = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    // console.log(letter);
    const acuallLetter = wordToGuess[i - 1];
    // console.log(acuallLetter);
    // Game Logic
    if (letter === acuallLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter != "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  if (successGuess) {
    // messageArea.innerHTML = `You Win The Word is <span>${wordToGuess}</span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>
     You Win, The Word Is
     <span>${wordToGuess}</span>`;
    } else {
      messageArea.innerHTML = `You Win, The Word Is
     <span>${wordToGuess}</span>`;
    }

    let allTries = document.querySelectorAll(".inputs > div");

    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    // Disable Guess Butten
    guesBtn.disabled = true;
    getHintButten.disabled = true;
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");

    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    const el = document.querySelector(`.try-${currentTry}`);

    if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guesBtn.disabled = true;
      getHintButten.disabled = true;
      messageArea.innerHTML = `You Lose The Word is <span>${wordToGuess}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) getHintButten.disabled = true;

  const enabledInputs = document.querySelectorAll("input:not([disabled])");

  // console.log(enabledInputs);
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
  // console.log(emptyEnabledInputs);
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    // console.log(randomIndex);
    // console.log(randomInput);
    // console.log(indexToFill);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Escape") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    // console.log(currentIndex);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace);
window.onload = function () {
  generateInput();
};
