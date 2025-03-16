export function createCard(cardData, toDelete, openPopup, cardLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardImage.addEventListener("click", () => {
    openPopup(cardData);
  });

  deleteButton.addEventListener("click", () => {
    toDelete(cardElement);
  });

  likeButton.addEventListener("click", () => {
    cardLike(likeButton);
  });

  return cardElement;
}

export function handleDeleteCard(cardElement) {
  cardElement.remove();
  cardElement = null;
}

export function handleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
