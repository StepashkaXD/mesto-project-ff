`use strict`;
import { createCard } from "./components/card.js";
import { openPopup, closePopup, initPopups } from "./components/popup.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { initProfileForm } from "./components/form-profile.js";
import { initNewPlaceForm } from "./components/form-new-place.js";
import { initAvatarForm } from "./components/form-avatar.js";
import {
  getArrayCards,
  getUser,
  likeCard,
  unlikeCard,
  deleteCard,
  editProfile,
  editAvatar,
  addCard,
} from "./components/api.js";

import "./pages/index.css";

// DOM elements
const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const formProfile = document.forms.edit_profile;
const formNewPlace = document.forms.new_place;
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const avatarButton = document.querySelector(".profile__image-button");
const popupAvatar = document.querySelector(".popup_type_avatar");
const formAvatar = document.forms.avatar;
const profileAvatar = document.querySelector(".profile__image");

let userId = null;

function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log("Ошибка при удалении карточки:", error);
    });
}

function handleLikeCard(cardId, isLiked, likeButton, likeCounter) {
  const likeAction = isLiked ? unlikeCard : likeCard;

  likeAction(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.error("Ошибка обновления лайка:", error);
    });
}

function openCardPopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopup(popupTypeImage);
}

function updateUserData(userData) {
  titleProfile.textContent = userData.name;
  descriptionProfile.textContent = userData.about;
  profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
}
// Configuration
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileFormConfig = {
  editButton,
  formProfile,
  titleProfile,
  descriptionProfile,
  popupProfile,
  editProfile,
};

const popupConfig = {
  closePopup,
  openPopup,
  openCardPopup,
};

const newPlaceFormConfig = {
  addButton,
  formNewPlace,
  placesList,
  popupNewCard,
  addCard,
};

const avatarConfig = {
  avatarButton,
  popupAvatar,
  formAvatar,
  editAvatar,
  profileAvatar,
};

const profileFormSettings = {
  profileFormConfig,
  popupConfig,
  validationConfig,
  clearValidation,
};

const newPlaceFormSettings = {
  newPlaceFormConfig,
  popupConfig,
  validationConfig,
  clearValidation,
  createCard,
  handleDeleteCard,
  handleLikeCard,
  userId,
};

const avatarFormSettings = {
  avatarConfig,
  popupConfig,
  validationConfig,
  clearValidation,
};

// Initialize
initProfileForm(profileFormSettings);
initNewPlaceForm(newPlaceFormSettings);
initAvatarForm(avatarFormSettings);
enableValidation(validationConfig);

initPopups();

Promise.all([getArrayCards(), getUser()])
  .then(([cardsData, userData]) => {
    updateUserData(userData);
    userId = userData._id;
    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        handleDeleteCard,
        openCardPopup,
        handleLikeCard,
        userId
      );
      placesList.append(cardElement);
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  });
