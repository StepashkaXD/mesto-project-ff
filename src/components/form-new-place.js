import { createCard, handleDeleteCard, handleLikeCard } from "./card.js";
import { openCardPopup } from "./popup.js";
export function initNewPlaceForm() {
  const formNewPlace = document.forms.new_place;

  const placesList = document.querySelector(".places__list");

  formNewPlace.addEventListener("submit", function (evt) {
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

    formNewPlace.reset();
  });
  return formNewPlace;
}
