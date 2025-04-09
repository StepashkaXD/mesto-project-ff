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
import {
  createCard,
  updateLikeCard,
  removeCardElement,
  toggleLikeButton,
} from "./components/card.js";
import { openPopup, closePopup, initPopups } from "./components/popup.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const placesList = document.querySelector(".places__list");
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const formProfile = document.forms.edit_profile;
const formNewPlace = document.forms.new_place;
const formAvatar = document.forms.avatar;

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewPlace = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupConfirm = document.querySelector(".popup_type_confirm");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image-button");
const confirmButton = document.querySelector(".popup__button-confirm");

const loaderContainer = document.querySelector(".page__loader-container");

let userId = null;
let cardIdToDelete;
let cardElementToDelete;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function handleLikeCard(cardId, isLiked, likeButton, likeCounter) {
  const likeAction = isLiked ? unlikeCard : likeCard;

  likeAction(cardId)
    .then((updatedCard) => {
      toggleLikeButton(likeButton);
      updateLikeCard(likeCounter, updatedCard.likes);
    })
    .catch((error) => {
      console.log("Ошибка обновления лайка:", error);
    });
}

function handleConfirmToDeleteCard(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;

  openPopup(popupConfirm);
}

function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      removeCardElement(cardElement);
    })
    .catch((error) => {
      console.log("Ошибка при удалении карточки:", error);
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
  renderLoading(true, evt.submitter);

  editProfile(name, about)
    .then((res) => {
      titleProfile.textContent = res.name;
      descriptionProfile.textContent = res.about;
      setTimeout(() => {
        closePopup(popupProfile);
      }, 100);
    })
    .catch((error) => {
      console.log("Ошибка обновления профиля:", error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const name = formNewPlace.elements.name.value;
  const link = formNewPlace.elements.link.value;
  renderLoading(true, evt.submitter);

  addCard(name, link)
    .then((newCard) => {
      placesList.prepend(
        createCard(
          newCard,
          handleConfirmToDeleteCard,
          openCardPopup,
          handleLikeCard,
          userId
        )
      );
      setTimeout(() => {
        closePopup(popupNewPlace);
      }, 100);
      formNewPlace.reset();
    })
    .catch((error) => {
      console.log("Ошибка добавления карточки:", error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const link = formAvatar.elements.link.value;
  renderLoading(true, evt.submitter);

  editAvatar(link)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      setTimeout(() => {
        closePopup(popupAvatar);
      }, 100);
      formAvatar.reset();
    })
    .catch((error) => {
      console.log("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранение";
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
  openPopup(popupNewPlace);
});

avatarButton.addEventListener("click", () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

confirmButton.addEventListener("click", () => {
  handleDeleteCard(cardIdToDelete, cardElementToDelete);
  closePopup(popupConfirm);
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
          handleConfirmToDeleteCard,
          openCardPopup,
          handleLikeCard,
          userId
        )
      );
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  })
  .finally(() => {
    loaderContainer.remove();
  });
