export function createCard(
  cardData,
  handleConfirmToDeleteCard,
  handleImageClick,
  handleLike,
  userId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  // Создаем контейнер для изображения
  const imageContainer = document.createElement('div');
  imageContainer.className = 'card__image-container';
  cardImage.parentNode.insertBefore(imageContainer, cardImage);
  imageContainer.appendChild(cardImage);

  // Проверяем загрузку изображения
  const img = new Image();
  img.onload = () => {
    cardImage.src = cardData.link;
    imageContainer.classList.remove('card__image-container_no-image');
  };
  img.onerror = () => {
    imageContainer.classList.add('card__image-container_no-image');
    imageContainer.textContent = 'НЕТ ФОТО';
  };
  img.src = cardData.link;

  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  if (cardData.likes.length) {
    cardData.likes.forEach((like) => {
      if (like._id === userId) {
        toggleLikeButton(likeButton);
      }
    });
  }

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  deleteButton.addEventListener("click", () =>
    handleConfirmToDeleteCard(cardData._id, cardElement)
  );

  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    handleLike(cardData._id, isLiked, likeButton, likeCounter);
  });

  return cardElement;
}

export function updateLikeCard(likeCaunter, likes) {
  likeCaunter.textContent = likes.length;
}

export function removeCardElement(cardElement) {
  cardElement.remove();
}

export function toggleLikeButton(button) {
  button.classList.toggle("card__like-button_is-active");
}
