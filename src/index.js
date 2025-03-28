"use strict";
import { initialCards } from "./components/array.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";
import { openPopup, initPopups } from "./components/popup.js";
import { initProfileForm } from "./components/form-profile.js";
import { initNewPlaceForm } from "./components/form-new-place.js";
import { enableValidation } from "./components/validation.js";

import "./pages/index.css";

export const placesList = document.querySelector(".places__list");

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageDescription = popupTypeImage.querySelector(".popup__caption");

export function openCardPopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageDescription.textContent = cardData.name;

  openPopup(popupTypeImage);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    openCardPopup,
    handleLikeCard
  );
  placesList.append(cardElement);
});

initProfileForm();
initNewPlaceForm();
initPopups();

enableValidation(validationConfig);
