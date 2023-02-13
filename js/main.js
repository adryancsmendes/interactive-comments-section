let comments = document.getElementById("comments-div");
let newComment = document.getElementById("new-comment");


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
  feedbackDiv.setAttribute("id","coment-user-feedback");

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

  let actionsImg = document.createElement("img");
  actionsImg.src = "/images/icon-edit.svg";
  actionsImg.alt = "icon-edit";

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

  commentDivContent.appendChild(commentDiv);

  comments.appendChild(commentDivContent);

  novoComentarioForm.reset();

})

//editando comentário
let botaoEditar = document.querySelectorAll(".comments-comment-reply-interactions-actions-current-user");

botaoEditar.forEach((elemento)=>{
  
  elemento.addEventListener("click", () =>{
    elemento.classList.toggle("active");
    let divComentario = elemento.parentNode.parentNode;
    console.log(divComentario);
    let textoEditavel = elemento.parentNode.parentNode.children[1].children[0];

    let botaoApagar = document.createElement("div");
    botaoApagar.classList.add("comments-comment-delete", "comments-reply-delete")
    botaoApagar.innerHTML = "Delete";

    let iconeApagar = document.createElement("img");
    iconeApagar.src = "/images/icon-delete.svg"
    botaoApagar.appendChild(iconeApagar);

    if(elemento.classList.contains("active")){
      console.log("ativo")
      console.log(elemento)
      elemento.innerHTML = "UPDATE";

      elemento.style.cssText =
      'color: #FFF;' +
      'background: #5457b6;' +
      'max-width: 5rem;' +
      'transition: .4s;' +
      'justify-content: center;';
      
      textoEditavel.setAttribute("contenteditable","true")
      textoEditavel.style.border = "solid 1px #5457b6"

      
      
      divComentario.appendChild(botaoApagar);

      //apagando comentario
      let modalApagarComentario = document.querySelector(".delete-comment-div");
      let botaoCancelarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-cancel");
      let botaoContinuarApagarComentario = document.querySelector(".delete-comment-div-content-buttons-delete");

      botaoApagar.addEventListener("click", ()=>{
        modalApagarComentario.classList.add("delete-comment-div-active");
      })
      
      botaoContinuarApagarComentario.addEventListener("click", ()=>{
        modalApagarComentario.classList.remove("delete-comment-div-active")
        divComentario.remove();
      })

      botaoCancelarApagarComentario.addEventListener("click", ()=>{
        modalApagarComentario.classList.remove("delete-comment-div-active")
      })

    }else{
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
      console.log("não ativo")
    }
    
  })
})

//apagando comentario



//adicionando avaliaçao comentários
const ratingButtons = document.querySelectorAll("[data-feedback]")

ratingButtons.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    let contadorLikes = parseInt(elemento.parentNode.children[1].value);
    let nomeUser = elemento.parentNode.parentNode.parentNode.children[0].children[0].children[1].innerText;
    elemento.parentNode.style.pointerEvents = "none";
    if (elemento.dataset.feedback == "plus" && nomeUser != 'juliusomo') {
      console.log('plus')
      elemento.parentNode.children[1].value = contadorLikes + 1;
    }
    if (elemento.dataset.feedback == "minus" && nomeUser != 'juliusomo') {
      console.log("minus")
      elemento.parentNode.children[1].value = contadorLikes - 1;
    }
  })
});

//fim adicionar likes e delsikes nos comentários







