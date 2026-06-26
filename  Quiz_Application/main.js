// Select Elemnts
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-are");

// Set Option
let currentIndex = 0;
function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObj = JSON.parse(this.responseText);
      let qCount = questionsObj.length;
      console.log(qCount);
      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObj[currentIndex], qCount);
    }
  };

  myRequest.open("Get", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Span
  for (let i = 0; i < num; i++) {
    //Create Bullet
    let theBullet = document.createElement("span");
    // Check if ts first span
    if (i === 0) {
      theBullet.className = "on";
    }
    // Append Bullet To Main Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  console.log(obj);
  console.log(count);
  // Create H2 Question
  let questionTitle = document.createElement("h2");
  // Create Question Text
  // let questionText = document.createTextNode(obj.title);
  let questionText = document.createTextNode(obj["title"]);
  // Append Text To H2
  questionTitle.append(questionText);
  // Append H2 To Quiz Area
  quizArea.append(questionText);
  // Create The Answer
  for (let i = 1; i <= 4; i++) {
    //create Main Answer Div
    let mainDiv = document.createElement("div");
    // Add Class To Main Div
    mainDiv.className = "answer";
    // Create Radio Input
    let radioInput = document.createElement("input");
    // Add Type + Name + Id + Data-Atrribute
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];
    // Make First Option Selected
    if (i === 1) {
      radioInput.checked = true;
    }
    // Create Label
    let theLable = document.createElement("label");
    // Add For Attribute
    theLable.htmlFor = `answer_${i}`;
    // Create Lable Text
    let theLabelText = document.createTextNode(obj[`answer_${i}`]);
    // Add Text To Label
    theLable.append(theLabelText);
    // Add Input + Label To Main Div
    mainDiv.append(radioInput);
    mainDiv.append(theLable);
    // Append All Divs To Answer Area
    answerArea.append(mainDiv);
  }
}
