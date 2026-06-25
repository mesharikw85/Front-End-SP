function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObj = JSON.parse(this.responseText);
      console.log(questionsObj);
    }
  };

  myRequest.open("Get", "html_questions.json", true);
  myRequest.send();
}

getQuestions();
