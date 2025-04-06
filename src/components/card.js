export function createCard( cardData, handleDelete, handleImageClick, handleLike, userId) {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  if (cardData.likes.length) {
    cardData.likes.forEach((like) => {
      if (like._id === userId) {
        likeButton.classList.toggle("card__like-button_is-active");
      }
    });
  }

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  deleteButton.addEventListener("click", () =>
    handleDelete(cardData._id, cardElement)
  );

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    handleLike(cardData._id, isLiked, likeButton, likeCounter);
  });

  return cardElement;
}
