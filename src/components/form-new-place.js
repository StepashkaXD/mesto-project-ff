import { createCard, handleDeleteCard, handleLikeCard } from "./card.js";
import { closePopup, openPopup } from "./popup.js";
import { openCardPopup, placesList, validationConfig } from "../index.js";
import { clearValidation } from "./validation.js";

export function initNewPlaceForm() {
  const formNewPlace = document.forms.new_place;
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const addButton = document.querySelector(".profile__add-button");

  addButton.addEventListener("click", () => {
    formNewPlace.reset();
    clearValidation(formNewPlace, validationConfig);
    openPopup(popupNewCard);
  });

  formNewPlace.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const cardData = {
      name: formNewPlace.elements.name.value,
      link: formNewPlace.elements.link.value,
    };

    const cardElement = createCard(
      cardData,
      handleDeleteCard,
      openCardPopup,
      handleLikeCard
    );

    placesList.prepend(cardElement);
    closePopup(popupNewCard);
    formNewPlace.reset();
  });
}
