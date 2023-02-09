let comments = document.getElementById("comments-div");

// Show loading indicator
comments.innerHTML = `<div class="loading">Loading...</div>`;

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    comments.innerHTML = ""; // clear the loading indicator

    data.comments.forEach((comment) => {
      // Create elements
      let commentDiv = document.createElement("div");
      commentDiv.classList.add("comments-comment")

      let userDiv = document.createElement("div");
      userDiv.classList.add("comments-comment-user")

      let userInfosDiv = document.createElement("div");
      userInfosDiv.classList.add("comments-comment-user-infos")

      let userImg = document.createElement("img");
      userImg.src = `${comment.user.image.png}`;
      userImg.alt = `${comment.user.image.alt}`;

      let userName = document.createElement("h3");
      userName.classList.add("comments-comment-user-infos-name");
      userName.textContent = comment.user.username;

      let date = document.createElement("div");
      date.classList.add("comments-comment-user-infos-date");
      date.textContent = comment.createdAt;

      let textDiv = document.createElement("div");
      textDiv.classList.add("comments-comment-text");

      let textP = document.createElement("p");
      textP.textContent = comment.content;

      let interactionsDiv = document.createElement("div");
      interactionsDiv.classList.add("comments-comment-interactions");

      let feedbackDiv = document.createElement("div");
      feedbackDiv.classList.add("comments-comment-interactions-feedback");

      let feedbackImgPlus = document.createElement("img");
      feedbackImgPlus.src = "/images/icon-plus.svg";
      feedbackImgPlus.alt = "icon-plus";

      let feedbackScore = document.createElement("span");
      feedbackScore.classList.add("comments-comment-interactions-feedback-score");
      feedbackScore.textContent = comment.score;

      let feedbackImgMinus = document.createElement("img");
      feedbackImgMinus.src = "/images/icon-minus.svg";
      feedbackImgMinus.alt = "icon-minus";

      let actionsDiv = document.createElement("div");
      actionsDiv.classList.add("comments-comment-interactions-actions");
      actionsDiv.innerHTML = "Reply"

      let actionsImg = document.createElement("img");
      actionsImg.src = "/images/icon-reply.svg";
      actionsImg.alt = "icon-reply";

      // Append elements
      userInfosDiv.appendChild(userImg);
      userInfosDiv.appendChild(userName);
      userInfosDiv.appendChild(date);

      userDiv.appendChild(userInfosDiv);

      textDiv.appendChild(textP);

      interactionsDiv.appendChild(feedbackDiv);
      interactionsDiv.appendChild(actionsDiv);

      feedbackDiv.appendChild(feedbackImgPlus);
      feedbackDiv.appendChild(feedbackScore);
      feedbackDiv.appendChild(feedbackImgMinus);

      actionsDiv.appendChild(actionsImg);

      commentDiv.appendChild(userDiv);
      commentDiv.appendChild(textDiv);
      commentDiv.appendChild(interactionsDiv);


      comments.appendChild(commentDiv);
    });
  })
  .catch((error) => {
    // Show error message
    comments.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  });
