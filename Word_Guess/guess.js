// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =
  `${gameName} Game Created By Meshari`;

// Part 2 Generate Inputs

// Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currebtTry = 1;

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i != 1) tryDiv.classList.add("disabled-inputs");

    for (let j = 1; j < numberOfTries; j++) {
      const inputs = document.createElement("input");
      inputs.type = "text";
      inputs.id = `guess-${i}-letter-${j}`;
      inputs.setAttribute("maxlength", "1");
      tryDiv.append(inputs);
    }

    inputsContainer.append(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();
}

window.onload = function () {
  generateInput();
};
