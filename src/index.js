`use strict`;

import "./pages/index.css";
import {
  getArrayCards,
  getUser,
  editProfile,
  editAvatar,
  addCard,
  deleteCard,
  likeCard,
  unlikeCard,
} from "./components/api.js";
import { createCard } from "./components/card.js";
import { openPopup, closePopup, initPopups } from "./components/popup.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const placesList = document.querySelector(".places__list");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const formProfile = document.forms.edit_profile;
const formNewPlace = document.forms.new_place;
const formAvatar = document.forms.avatar;
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image-button");
const profileAvatar = document.querySelector(".profile__image");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");

let userId = null;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

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
      console.log("Ошибка обновления лайка:", error);
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = formProfile.elements.name.value;
  const about = formProfile.elements.description.value;
  renderLoading(true);

  editProfile(name, about)
    .then(() => {
      titleProfile.textContent = name;
      descriptionProfile.textContent = about;
      setTimeout(() => {
        closePopup(popupProfile);
      }, 100);
    })
    .catch((error) => {
      console.log("Ошибка обновления профиля:", error);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const name = formNewPlace.elements.name.value;
  const link = formNewPlace.elements.link.value;
  renderLoading(true);

  addCard(name, link)
    .then((newCard) => {
      const cardElement = createCard(
        newCard,
        handleDeleteCard,
        openCardPopup,
        handleLikeCard,
        userId
      );
      placesList.prepend(cardElement);
      setTimeout(() => {
        closePopup(popupNewCard);
      }, 100);
      formNewPlace.reset();
    })
    .catch((error) => {
      console.log("Ошибка добавления карточки:", error);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const link = formAvatar.elements.link.value;
  renderLoading(true);

  editAvatar(link)
    .then(() => {
      profileAvatar.style.backgroundImage = `url(${link})`;
      setTimeout(() => {
        closePopup(popupAvatar);
      }, 100);
      formAvatar.reset();
    })
    .catch((error) => {
      console.log("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(false);
    });
}

function renderLoading(isLoading) {
  const popupButton = document.querySelector(".popup_is-opened .popup__button");
  popupButton.textContent = isLoading ? "Сохранение..." : "Сохранение";
}

editButton.addEventListener("click", () => {
  formProfile.elements.name.value = titleProfile.textContent;
  formProfile.elements.description.value = descriptionProfile.textContent;
  clearValidation(formProfile, validationConfig);
  openPopup(popupProfile);
});

addButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(popupNewCard);
});

avatarButton.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

formProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handleNewPlaceFormSubmit);
formAvatar.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(validationConfig);
initPopups();

Promise.all([getArrayCards(), getUser()])
  .then(([cardsData, userData]) => {
    updateUserData(userData);
    userId = userData._id;
    cardsData.forEach((cardData) => {
      placesList.append(
        createCard(
          cardData,
          handleDeleteCard,
          openCardPopup,
          handleLikeCard,
          userId
        )
      );
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  });
