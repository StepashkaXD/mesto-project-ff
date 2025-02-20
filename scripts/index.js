// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
'use strict'
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard(cardData, toDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    toDelete(cardElement);
  });

  return cardElement;
};

function handleDeleteCard(cardElement) {
  cardElement.remove();
};

function renderCard(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard);
  placesList.append(cardElement);
};

initialCards.forEach(renderCard);


