"use strict";
import { initialCards } from "./components/array.js";
import { createCard, handleDeleteCard, handleLikeCard } from "./components/card.js";
import { openPopup, initPopups } from "./components/popup.js";
import { initProfileForm } from "./components/form-profile.js";
import { initNewPlaceForm } from "./components/form-new-place.js";
import "./pages/index.css";

export const placesList = document.querySelector(".places__list");

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

//--------------------
export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_inactive");
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      "Поля могут содержать только латинские и кириллические буквы, знаки дефиса и пробелы"
    );
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.forms);

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

export const resetValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
}

enableValidation();
