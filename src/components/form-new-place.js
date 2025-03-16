import { createCard, handleDeleteCard, handleLikeCard } from "./card.js";
import { closePopup, openPopup } from "./popup.js";
import { openCardPopup } from "../index.js"

export function initNewPlaceForm() {
  const formNewPlace = document.forms.new_place;
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const addButton = document.querySelector(".profile__add-button");

  addButton.addEventListener("click", () => {
    formNewPlace.reset();
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
      (cardData) => {
        const popupImage = document.querySelector(".popup_type_image");
        const imagePopup = popupImage.querySelector(".popup__image");
        const descriptionPopup = popupImage.querySelector(".popup__caption");

        imagePopup.src = cardData.link;
        imagePopup.alt = cardData.name;
        descriptionPopup.textContent = cardData.name;

        popupImage.classList.add("popup_is-opened");
        openCardPopup(cardData);
      },
      handleLikeCard
    );

    document.querySelector('.places__list').prepend(cardElement);
    closePopup(popupNewCard);
    formNewPlace.reset();
  });
}
