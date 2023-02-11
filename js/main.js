let comments = document.getElementById("comments-div");
let newComment = document.getElementById("new-comment");
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
      //Main comments

      let commentDiv = document.createElement("div");
      commentDiv.classList.add("comments-comment")

      let commentDivContent = document.createElement("div");
      commentDivContent.classList.add("comments-comment-content")

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
      feedbackImgPlus.setAttribute('data-feedback', 'plus');

      let feedbackScore = document.createElement("input");
      feedbackScore.classList.add("comments-comment-interactions-feedback-score");
      feedbackScore.setAttribute('value', `${comment.score}`)
      feedbackScore.setAttribute('type', 'number');


      let feedbackImgMinus = document.createElement("img");
      feedbackImgMinus.src = "/images/icon-minus.svg";
      feedbackImgMinus.alt = "icon-minus";
      feedbackImgMinus.setAttribute('data-feedback', 'minus');

      let actionsDiv = document.createElement("div");
      actionsDiv.classList.add("comments-comment-interactions-actions");
      actionsDiv.innerHTML = "Reply"

      let actionsImg = document.createElement("img");
      if(comment.user.username != 'juliosomo'){
        actionsImg.src = "/images/icon-reply.svg";
        actionsImg.alt = "icon-reply";
      }else{
        actionsImg.src = "/images/icon-edit.svg";
        actionsImg.alt = "icon-edit";
      }
      // Append elements
      //Main comments
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

      commentDivContent.appendChild(commentDiv);

      comments.appendChild(commentDivContent);


      //Reply comments
      let existentReplies = comment.replies;
      if (comment.replies != []) {

        existentReplies.forEach((reply) => {

          //Create elements reply


          let replyCommentDiv = document.createElement("div");
          replyCommentDiv.classList.add("comments-comment", "comments-reply")

          let replyUserDiv = document.createElement("div");
          replyUserDiv.classList.add("comment-comments-user", "comment-comments-reply-user");

          let replyUserInfosDiv = document.createElement("div");
          replyUserInfosDiv.classList.add("comments-comment-user-infos", "comments-comment-reply-user-infos")

          let replyUserImg = document.createElement("img");
          replyUserImg.src = `${reply.user.image.png}`;
          replyUserImg.alt = `${reply.user.image.alt}`;

          let replyUserName = document.createElement("h3");
          replyUserName.classList.add("comments-comment-user-infos-name", "comments-comment-reply-user-infos-name");
          replyUserName.textContent = reply.user.username;

          let replyDate = document.createElement("div");
          replyDate.classList.add("comments-comment-user-infos-date", "comments-comment-reply-user-infos-date");
          replyDate.textContent = reply.createdAt;

          let replyTextDiv = document.createElement("div");
          replyTextDiv.classList.add("comments-comment-text", "comments-comment-reply-text");

          let replyTextP = document.createElement("p");
          replyTextP.textContent = reply.content;

          let replyInteractionsDiv = document.createElement("div");
          replyInteractionsDiv.classList.add("comments-comment-interactions", "comments-comment-reply-interactions");
          

          let replyFeedbackDiv = document.createElement("div");
          replyFeedbackDiv.classList.add("comments-comment-interactions-feedback", "comments-comment-reply-interactions-feedback");

          let replyFeedbackImgPlus = document.createElement("img");
          replyFeedbackImgPlus.src = "/images/icon-plus.svg";
          replyFeedbackImgPlus.alt = "icon-plus";
          replyFeedbackImgPlus.setAttribute('data-feedback', 'plus');

          let replyFeedbackScore = document.createElement("input");
          replyFeedbackScore.classList.add("comments-comment-interactions-feedback-score", "comments-comment-reply-interactions-feedback-score");
          replyFeedbackScore.setAttribute('value', `${reply.score}`)
          replyFeedbackScore.setAttribute('type', 'number');

          let replyFeedbackImgMinus = document.createElement("img");
          replyFeedbackImgMinus.src = "/images/icon-minus.svg";
          replyFeedbackImgMinus.alt = "icon-minus";
          replyFeedbackImgMinus.setAttribute('data-feedback', 'minus');

          let replyActionsDiv = document.createElement("div");
          if(reply.user.username != 'juliusomo'){
            replyActionsDiv.classList.add("comments-comment-interactions-actions", "comments-comment-reply-interactions-actions");
          replyActionsDiv.innerHTML = "Reply";
          }else{
            replyActionsDiv.classList.add("comments-comment-interactions-actions", "comments-comment-reply-interactions-actions","comments-comment-reply-interactions-actions-current-user");
            replyActionsDiv.innerHTML = "Edit";
          }

          let replyActionsImg = document.createElement("img");
          if(reply.user.username != 'juliusomo'){
            replyActionsImg.src = "/images/icon-reply.svg";
            replyActionsImg.alt = "icon-reply";
          }else{
            replyActionsImg.src = "/images/icon-edit.svg";
            replyActionsImg.alt = "icon-edit";
          }

          //Append elements reply
          replyUserInfosDiv.appendChild(replyUserImg);
          replyUserInfosDiv.appendChild(replyUserName);
          replyUserInfosDiv.appendChild(replyDate);

          replyUserDiv.appendChild(replyUserInfosDiv);

          replyTextDiv.appendChild(replyTextP);

          replyInteractionsDiv.appendChild(replyFeedbackDiv);
          replyInteractionsDiv.appendChild(replyActionsDiv);

          replyFeedbackDiv.appendChild(replyFeedbackImgPlus);
          replyFeedbackDiv.appendChild(replyFeedbackScore);
          replyFeedbackDiv.appendChild(replyFeedbackImgMinus);

          replyActionsDiv.appendChild(replyActionsImg);

          replyCommentDiv.appendChild(replyUserDiv);
          replyCommentDiv.appendChild(replyTextDiv);
          replyCommentDiv.appendChild(replyInteractionsDiv);



          comments.appendChild(replyCommentDiv);

          commentDivContent.appendChild(replyCommentDiv);
        })

      }
    });

    //New comment div
    //Create elements
    let newCommentDiv = document.createElement("div");
    newCommentDiv.classList.add("new-comment-div");

    let newCommentUser = document.createElement("div");
    newCommentUser.classList.add("new-comment-div-user");

    let newCommentUserImage = document.createElement("img");
    newCommentUserImage.src = `${data.currentUser.image.png}`;
    newCommentUserImage.alt = `${data.currentUser.image.alt}`;

    let newCommentUserForm = document.createElement("form");
    newCommentUserForm.classList.add("new-comment-div-user-form")
    newCommentUserForm.setAttribute('action', '');
    newCommentUserForm.setAttribute('id', 'novo-comentario');

    let newCommentUserFormText = document.createElement("input");
    newCommentUserFormText.setAttribute('type', 'text');
    newCommentUserFormText.setAttribute('placeholder', 'Add a comment...');
    newCommentUserFormText.setAttribute('id', 'novo-comentario-texto');
    newCommentUserFormText.setAttribute('required', '');
    newCommentUserFormText.classList.add("new-comment-div-user-form-text")

    let newCommentUserFormButton = document.createElement("input");
    newCommentUserFormButton.setAttribute('type', 'submit');
    newCommentUserFormButton.setAttribute('value', 'send');
    newCommentUserFormButton.classList.add("new-comment-div-user-form-button");


    //Append elements
    newCommentUserForm.appendChild(newCommentUserFormText)
    newCommentUserForm.appendChild(newCommentUserFormButton)

    newCommentUser.appendChild(newCommentUserImage);
    newCommentUser.appendChild(newCommentUserForm)

    newCommentDiv.appendChild(newCommentUser);

    newComment.appendChild(newCommentDiv);


    

    //Adicionar novo comentário
    const novoComentarioForm = document.getElementById("novo-comentario");

    novoComentarioForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let textoComentario = document.getElementById("novo-comentario-texto").value;

      //criando elementos

      let commentDiv = document.createElement("div");
      commentDiv.classList.add("comments-comment")
      

      let commentDivContent = document.createElement("div");
      commentDivContent.classList.add("comments-comment-content")

      let userDiv = document.createElement("div");
      userDiv.classList.add("comments-comment-user")

      let userInfosDiv = document.createElement("div");
      userInfosDiv.classList.add("comments-comment-user-infos")

      let userImg = document.createElement("img");
      userImg.src = `${data.currentUser.image.png}`;
      userImg.alt = `${data.currentUser.image.alt}`;

      let userName = document.createElement("h3");
      userName.classList.add("comments-comment-user-infos-name");
      userName.textContent = data.currentUser.username;

      let date = document.createElement("div");
      date.classList.add("comments-comment-user-infos-date");
      date.textContent = 'Now';

      let textDiv = document.createElement("div");
      textDiv.classList.add("comments-comment-text");

      let textP = document.createElement("p");
      textP.textContent = textoComentario;

      let interactionsDiv = document.createElement("div");
      interactionsDiv.classList.add("comments-comment-interactions");

      let feedbackDiv = document.createElement("div");
      feedbackDiv.classList.add("comments-comment-interactions-feedback");

      let feedbackImgPlus = document.createElement("img");
      feedbackImgPlus.src = "/images/icon-plus.svg";
      feedbackImgPlus.alt = "icon-plus";
      feedbackImgPlus.setAttribute('data-feedback', 'plus');

      let feedbackScore = document.createElement("input");
      feedbackScore.classList.add("comments-comment-interactions-feedback-score");
      feedbackScore.setAttribute('value', `0`)
      feedbackScore.setAttribute('type', 'number');


      let feedbackImgMinus = document.createElement("img");
      feedbackImgMinus.src = "/images/icon-minus.svg";
      feedbackImgMinus.alt = "icon-minus";
      feedbackImgMinus.setAttribute('data-feedback', 'minus');

      let actionsDiv = document.createElement("div");
      actionsDiv.classList.add("comments-comment-interactions-actions","comments-comment-interactions-actions-current-user");
      actionsDiv.innerHTML = "Edit"

      let actionsImg = document.createElement("img");
      actionsImg.src = "/images/icon-edit.svg";
      actionsImg.alt = "icon-edit";

      //append elementos

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

      commentDivContent.appendChild(commentDiv);

      comments.appendChild(commentDivContent);

      novoComentarioForm.reset();
    })

    //adicionar like e deslike nos comentários
    const ratingButtons = document.querySelectorAll("[data-feedback]");
    ratingButtons.forEach((elemento) => {
      elemento.addEventListener("click", (evento) => {
        elemento.parentNode.style.pointerEvents = "none";
        let contadorLikes = parseInt(elemento.parentNode.children[1].value);
        if (elemento.dataset.feedback == "plus") {
          console.log('plus')
          elemento.parentNode.children[1].value = contadorLikes + 1;
        }
        if (elemento.dataset.feedback == "minus") {
          console.log("minus")
          elemento.parentNode.children[1].value = contadorLikes - 1;
        }
      })
    });
    //fim adicionar likes e delsikes nos comentários


  })
  .catch((error) => {
    // Show error message
    comments.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  });



