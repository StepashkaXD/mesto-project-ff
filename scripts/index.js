// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach((initialCards, deleteCard) => {
  const placesList = document.querySelector(".places__list");
  const cardsTemplate = document.querySelector("#card-template").content;
  const cardElement = cardsTemplate
    .querySelector(".places__item")
    .cloneNode("true");

  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__image").alt = initialCards.name;
  cardElement.querySelector(".card__title").textContent = initialCards.name;

  placesList.append(cardElement);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  deleteCard = (deleteButton) => {
    const toDelete = deleteButton.closest(".places__item");
    toDelete.remove();
  };
});