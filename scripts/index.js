// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

createCard = (initialCards, toDelete) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = initialCards.link;
  cardElement.querySelector(".card__image").alt = initialCards.name;
  cardElement.querySelector(".card__title").textContent = initialCards.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    toDelete(cardElement);
  });

  return cardElement;
};

handleDeleteCard = (cardElement) => {
  cardElement.remove();
};

renderCard = (initialCards) => {
  const cardElement = createCard(initialCards, handleDeleteCard);
  placesList.append(cardElement);
};

initialCards.forEach(renderCard);
