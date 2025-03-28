import { closePopup, openPopup } from "./popup.js";
import { validationConfig } from "../index.js";
import { clearValidation } from "./validation.js";

export function initProfileForm() {
  const formProfile = document.forms.edit_profile;
  const titleProfile = document.querySelector(".profile__title");
  const descriptionProfile = document.querySelector(".profile__description");
  const editButton = document.querySelector(".profile__edit-button");
  const popupProfile = document.querySelector(".popup_type_edit");

  editButton.addEventListener("click", () => {
    formProfile.elements.name.value = titleProfile.textContent;
    formProfile.elements.description.value = descriptionProfile.textContent;
    openPopup(popupProfile);
    clearValidation(formProfile, validationConfig);
  });

  formProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    titleProfile.textContent = formProfile.elements.name.value;
    descriptionProfile.textContent = formProfile.elements.description.value;
    closePopup(popupProfile);
  });
}
