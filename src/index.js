"use strict";
import { initialCards } from "./components/array.js";
import { createCard, handleDeleteCard, handleLikeCard } from "./components/card.js";
import { initPopup, openCardPopup } from "./components/popup.js";
import { initProfileForm } from "./components/form-profile.js";
import { initNewPlaceForm } from "./components/form-new-place.js";
import "./pages/index.css";

const placesList = document.querySelector(".places__list");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeAdd = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profileForm = initProfileForm();
const newPlaceForm = initNewPlaceForm();

initPopup(popupTypeEdit, editProfileButton, profileForm);
initPopup(popupTypeAdd, addCardButton, newPlaceForm);

initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    openCardPopup,
    handleLikeCard
  );
  placesList.append(cardElement);
});
