// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");
// "https://api.github.com/users/mesharikw85/repos"
getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value === "") {
    // If Value Is Empty
    reposData.innerHTML = "<span>Please write GitHub Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repositories) => {
        // Empty The Container
        // console.log(repositories);
        reposData.innerHTML = "";
        // Loop On Repositories
        repositories.forEach((repo) => {
          // Create Main Div Element
          let mainDiv = document.createElement("div");
          //Create Repo Name Text
          let repoName = document.createTextNode(repo.name);
          // Append The Text To Main Div
          mainDiv.append(repoName);
          // Create Repo URL Anchor
          let theUrl = document.createElement("a");
          //Create Url Name Text
          let urlText = document.createTextNode("Visit");
          // Append the Repo url text To anchor tag
          theUrl.append(urlText);
          // Add The Hypertext Reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          // theUrl.href = `https://github.com/mesharikw85/${repo.name}`;
          // Set Attribute Blank
          theUrl.setAttribute("target", "_blank"); 
          // Append•Url Anchor To Main Div
          mainDiv.append(theUrl);
          // Create Stars Count Span
          let starsSpan = document.createElement("span");
          // Create The Stars Count Text
          let starText = document.createTextNode(
            `Stars  ${repo.stargazers_count}`,
          );
          // Add-Stars Count Text To Stars Span
          starsSpan.append(starText);
          // Append Stars Count Span to Main Div
          mainDiv.append(starsSpan);
          // Add class On Main Div
          mainDiv.className = "repo-box";
          // Append The Div TO Main Container
          reposData.append(mainDiv);
        });
      });
  }
}
