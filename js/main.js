let comments = document.getElementById("comments-div");
let newComment = document.getElementById("new-comment");


//Adicionar novo comentário
const novoComentarioForm = document.getElementById("novo-comentario");

novoComentarioForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let textoComentario = document.getElementById("novo-comentario-texto").value;

  //criando elementos

  let commentDiv = document.createElement("div");
  commentDiv.classList.add("comments-comment", "comments-comment-new")

  let commentDivContent = document.createElement("div");
  commentDivContent.classList.add("comments-comment-content")

  let userDiv = document.createElement("div");
  userDiv.classList.add("comments-comment-user")

  let userInfosDiv = document.createElement("div");
  userInfosDiv.classList.add("comments-comment-user-infos")

  let userImg = document.createElement("img");
  userImg.src = "images/avatars/image-juliusomo.png";

  let userName = document.createElement("h3");
  userName.classList.add("comments-comment-user-infos-name");
  userName.textContent = "juliusomo";

  let userTag = document.createElement("div");
  userTag.classList.add("comments-comment-user-infos-tag");
  userTag.textContent = "you";

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
  feedbackDiv.setAttribute("id", "coment-user-feedback");

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
  actionsDiv.classList.add("comments-comment-interactions-actions", "comments-comment-interactions-actions-current-user");
  actionsDiv.innerHTML = "Edit"
  actionsDiv.setAttribute('onclick', 'editarComentario()');

  let actionsImg = document.createElement("img");
  actionsImg.src = "/images/icon-edit.svg";
  actionsImg.alt = "icon-edit";

  let botaoApagar = document.createElement("div");
  botaoApagar.classList.add("comments-comment-delete", "comments-reply-delete")
  botaoApagar.innerHTML = "Delete";

  let iconeApagar = document.createElement("img");
  iconeApagar.src = "/images/icon-delete.svg"
  botaoApagar.appendChild(iconeApagar);

  //append elementos

  userInfosDiv.appendChild(userImg);
  userInfosDiv.appendChild(userName);
  userInfosDiv.appendChild(userTag);
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

  commentDiv.appendChild(botaoApagar)

  commentDivContent.appendChild(commentDiv);

  comments.appendChild(commentDivContent);

  novoComentarioForm.reset();

  //editando novo comentario

})

//editando novo comentario
function editarComentario() {
  let novoComentario = document.querySelectorAll(".comments-comment-new");

  novoComentario.forEach((elemento) => {
    elemento.classList.toggle("active");
    elemento.addEventListener("click", () => {

      let textoEditavel = elemento.children[1].children[0];

      let deleteDiv = elemento.children[3]

      let botaoEditar = elemento.children[2].children[1];
      if (elemento.classList.contains("active")) {
        //habilitando edição texto
        textoEditavel.setAttribute("contenteditable", "true")
        textoEditavel.style.border = "solid 1px #5457b6"
        textoEditavel.style.borderRadius = "0.5rem";
        textoEditavel.style.padding = "0.5rem";

        //atualizando botao editar para update
        botaoEditar.innerHTML = "UPDATE"
        botaoEditar.style.cssText =
          'color: #FFF;' +
          'background: #5457b6;' +
          'max-width: 5rem;' +
          'transition: .4s;' +
          'justify-content: center;';

        //mostrando div que permite exclusao
        deleteDiv.style.visibility = "visible";

        //excluindo comentario
        let modalApagarComentario = document.querySelector(".delete-comment-div");
        let botaoCancelarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-cancel");
        let botaoContinuarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-delete");

        deleteDiv.addEventListener("click", () => {
          modalApagarComentario.classList.add("delete-comment-div-active");
        })

        botaoContinuarApagarComentario.addEventListener("click", () => {
          modalApagarComentario.classList.remove("delete-comment-div-active")
          elemento.remove();
        })

        botaoCancelarApagarComentario.addEventListener("click", () => {
          modalApagarComentario.classList.remove("delete-comment-div-active")
        })

      } else {
        //desabilitando edição de texto
        textoEditavel.removeAttribute("contenteditable")
        textoEditavel.style.border = "none"
        textoEditavel.style.padding = "0";

        //retornando botao update ao estado normal de edit
        botaoEditar.innerHTML = "Edit <img src='/images/icon-edit.svg' alt='icon-edit'>"
        botaoEditar.style.cssText =
          'color: #5457b6;' +
          'background: none;' +
          'max-width: 3.25rem;' +
          'transition: .4s;' +
          'justify-content: space-between;';

        //escondendo div que permite exclusao
        deleteDiv.style.visibility = "hidden";
      }
    })
  })
}


//editando comentário exitente
let botaoEditar = document.querySelectorAll(".comments-comment-reply-interactions-actions-current-user");

botaoEditar.forEach((elemento) => {

  elemento.addEventListener("click", () => {
    elemento.classList.toggle("active");
    let divComentario = elemento.parentNode.parentNode;
    
    let textoEditavel = elemento.parentNode.parentNode.children[1].children[0];

    let botaoApagar = document.createElement("div");
    botaoApagar.classList.add("comments-comment-delete", "comments-reply-delete")
    botaoApagar.innerHTML = "Delete";

    let iconeApagar = document.createElement("img");
    iconeApagar.src = "/images/icon-delete.svg"
    botaoApagar.appendChild(iconeApagar);

    if (elemento.classList.contains("active")) {
      elemento.innerHTML = "UPDATE";

      elemento.style.cssText =
        'color: #FFF;' +
        'background: #5457b6;' +
        'max-width: 5rem;' +
        'transition: .4s;' +
        'justify-content: center;';

      textoEditavel.setAttribute("contenteditable", "true")
      textoEditavel.style.border = "solid 1px #5457b6"
      textoEditavel.style.borderRadius = "0.5rem";
      textoEditavel.style.padding = "0.5rem";

      divComentario.appendChild(botaoApagar);

      //apagando comentario
      let modalApagarComentario = document.querySelector(".delete-comment-div");
      let botaoCancelarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-cancel");
      let botaoContinuarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-delete");

      botaoApagar.addEventListener("click", () => {
        modalApagarComentario.classList.add("delete-comment-div-active");
      })

      botaoContinuarApagarComentario.addEventListener("click", () => {
        modalApagarComentario.classList.remove("delete-comment-div-active")
        divComentario.remove();
      })

      botaoCancelarApagarComentario.addEventListener("click", () => {
        modalApagarComentario.classList.remove("delete-comment-div-active")
      })

    } else {
      divComentario.querySelector('.comments-reply-delete').remove()
      elemento.innerHTML = "Edit <img src='/images/icon-edit.svg' alt='icon-edit'>"

      elemento.style.cssText =
        'color: #5457b6;' +
        'background: none;' +
        'max-width: 3.25rem;' +
        'transition: .4s;' +
        'justify-content: space-between;';

      textoEditavel.removeAttribute("contenteditable")
      textoEditavel.style.border = "none"
      textoEditavel.style.padding = "0";

    }

  })
})

//adicionando avaliaçao comentários
const ratingButtons = document.querySelectorAll("[data-feedback]")

ratingButtons.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    let contadorLikes = parseInt(elemento.parentNode.children[1].value);
    let nomeUser = elemento.parentNode.parentNode.parentNode.children[0].children[0].children[1].innerText;
    elemento.parentNode.style.pointerEvents = "none";
    if (elemento.dataset.feedback == "plus" && nomeUser != 'juliusomo') {
      
      elemento.parentNode.children[1].value = contadorLikes + 1;
    }
    if (elemento.dataset.feedback == "minus" && nomeUser != 'juliusomo') {
      
      elemento.parentNode.children[1].value = contadorLikes - 1;
    }
  })
});

//adicionando nova resposta

let botaoResposta = document.querySelectorAll(".reply");

botaoResposta.forEach((botao) => {
  botao.addEventListener("click", () => {
    let divComentario = botao.parentNode.parentNode.parentNode;

    //create elements
    let newCommentDiv = document.createElement("div");
    newCommentDiv.classList.add("new-comment-div");

    let newCommentDivUser = document.createElement("div");
    newCommentDivUser.classList.add("new-comment-div-user");

    let newCommentDivUserInfos = document.createElement("div");
    newCommentDivUserInfos.classList.add("new-comment-div-user-infos");

    let newCommentDivUserInfosImg = document.createElement("img");
    newCommentDivUserInfosImg.src = "/images/avatars/image-juliusomo.png";
    newCommentDivUserInfosImg.alt = "your avatar";

    let newCommentDivUserInfosName = document.createElement("h3");
    newCommentDivUserInfosName.innerHTML = "juliusomo";

    let newCommentDivUserInfosTag = document.createElement("div");
    newCommentDivUserInfosTag.innerHTML = "you";
    newCommentDivUserInfosTag.classList.add("new-comment-div-user-infos-tag")

    let newCommentDivUserInfosDate = document.createElement("div");
    newCommentDivUserInfosDate.classList.add("new-comment-div-user-infos-date")
    newCommentDivUserInfosDate.innerHTML = "Now";

    let newCommentDivSubdivision = document.createElement("div");
    newCommentDivSubdivision.classList.add("new-comment-div-sub")

    let newCommentDivText = document.createElement("div");
    newCommentDivText.classList.add("new-comment-div-sub-text")

    let newCommentDivTextP = document.createElement("p");
    newCommentDivTextP.setAttribute("contenteditable", "true");

    let newCommentDivInteractions = document.createElement("div");
    newCommentDivInteractions.classList.add("new-comment-div-sub-interactions")

    let newCommentDivReplyButton = document.createElement("button");
    newCommentDivReplyButton.classList.add("new-comment-div-sub-interactions-reply")
    newCommentDivReplyButton.innerHTML = "REPLY";

    let newCommentDivCancelButton = document.createElement("button");
    newCommentDivCancelButton.classList.add("new-comment-div-sub-interactions-cancel")
    newCommentDivCancelButton.innerHTML = "CANCEL";

    let newCommentDivSendButton = document.createElement("button");
    newCommentDivSendButton.classList.add("new-comment-div-sub-interactions-send")
    newCommentDivSendButton.innerHTML = "SEND";

    let newCommentDivEditButton = document.createElement("div");
    newCommentDivEditButton.classList.add("new-comment-div-sub-interactions-edit");
    newCommentDivEditButton.innerHTML = "Edit"

    let newCommentDivEditButtonImg = document.createElement("img");
    newCommentDivEditButtonImg.src = "/images/icon-edit.svg";
    newCommentDivEditButtonImg.alt = "icon-edit";

    let newCommentDivDeleteButton = document.createElement("div");
    newCommentDivDeleteButton.classList.add("new-comment-div-sub-interactions-delete")
    newCommentDivDeleteButton.innerHTML = "Delete";

    let newCommentDivDeleteButtonImg = document.createElement("img");
    newCommentDivDeleteButtonImg.src = "/images/icon-delete.svg"
    newCommentDivDeleteButton.appendChild(newCommentDivDeleteButtonImg);

    //append elements
    newCommentDivText.appendChild(newCommentDivTextP);

    newCommentDivUserInfos.appendChild(newCommentDivUserInfosImg);
    newCommentDivUserInfos.appendChild(newCommentDivUserInfosName);
    newCommentDivUserInfos.appendChild(newCommentDivUserInfosTag);
    newCommentDivUserInfos.appendChild(newCommentDivUserInfosDate);

    newCommentDivUser.appendChild(newCommentDivUserInfos)

    newCommentDivEditButton.appendChild(newCommentDivEditButtonImg);

    newCommentDivInteractions.appendChild(newCommentDivReplyButton);
    newCommentDivInteractions.appendChild(newCommentDivCancelButton);

    newCommentDivSubdivision.appendChild(newCommentDivText)
    newCommentDivSubdivision.appendChild(newCommentDivInteractions)

    newCommentDiv.appendChild(newCommentDivUser);
    newCommentDiv.appendChild(newCommentDivSubdivision);

    divComentario.appendChild(newCommentDiv);


    //funcionalidades

    //cancela adição de novo comentario
    newCommentDivCancelButton.onclick = () => {
      divComentario.removeChild(newCommentDiv);
    }

    //publica comentario
    newCommentDivInteractions.onclick = () => {
      newCommentDivTextP.removeAttribute("contenteditable");
      newCommentDivTextP.style.border = "none";
      newCommentDivCancelButton.style.display = "none";
      newCommentDivReplyButton.style.display = "none";
      newCommentDivSubdivision.style.maxWidth = "100%";
      newCommentDivInteractions.appendChild(newCommentDivEditButton);
      newCommentDivUserInfosTag.style.display = "flex";
      newCommentDivUserInfosDate.style.display = "flex";
    }

    //editar comentario resposta
    newCommentDivEditButton.onclick = () => {
      
      newCommentDivText.setAttribute("contenteditable", "true");
      newCommentDivText.style.border = "solid 1px #5457b6";
      newCommentDivText.style.padding = "0.5rem";
      newCommentDivText.style.borderRadius = "0.5rem";

      newCommentDivInteractions.appendChild(newCommentDivSendButton);
      newCommentDivInteractions.appendChild(newCommentDivDeleteButton);
      newCommentDivEditButton.style.display = "none";
      newCommentDivDeleteButton.style.display = "flex";
    }

    newCommentDivSendButton.onclick = () => {
      
      newCommentDivText.style.border = "none";
      newCommentDivInteractions.removeChild(newCommentDivSendButton);
      newCommentDivInteractions.appendChild(newCommentDivEditButton)
      newCommentDivText.removeAttribute("contenteditable");
      newCommentDivEditButton.style.display = "flex";
      newCommentDivDeleteButton.style.display = "none";
    }

    newCommentDivDeleteButton.onclick = () =>{
      let modalApagarComentario = document.querySelector(".delete-comment-div");
      let botaoCancelarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-cancel");
      let botaoContinuarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-delete");

      modalApagarComentario.classList.add("delete-comment-div-active");

      botaoContinuarApagarComentario.addEventListener("click", () => {
        modalApagarComentario.classList.remove("delete-comment-div-active")
        newCommentDiv.remove();
      })

      botaoCancelarApagarComentario.addEventListener("click", () => {
        modalApagarComentario.classList.remove("delete-comment-div-active")
      })

    }

  })
})









