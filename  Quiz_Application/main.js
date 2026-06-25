// Select Elemnts
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObj = JSON.parse(this.responseText);
      let questionsCount = questionsObj.length;
      console.log(questionsCount);
      // Create Bullets + Set Questions Count
      createBullets(questionsCount);
    }
  };

  myRequest.open("Get", "html_questions.json", true);
  myRequest.send();
}
// Create The Bullets Function
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
