// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =
  `${gameName} Game Created By Meshari`;

// Part 5 Manage Win

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

// Manage Word
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
let messageArea = document.querySelector(".message");

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// console.log(wordToGuess);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

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
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input",
  );
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
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`,
    );
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
    messageArea.innerHTML = `You Win The Word is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");

    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    guesBtn.disabled = true;
  } else {
    console.log("You Loos");
  }
}

window.onload = function () {
  generateInput();
};
