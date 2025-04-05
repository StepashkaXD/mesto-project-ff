export function initNewPlaceForm(settings) {
  const {
    newPlaceFormConfig,
    popupConfig,
    validationConfig,
    clearValidation,
    createCard,
    handleDeleteCard,
    handleLikeCard,
    userId
  } = settings;

  const { addButton, formNewPlace, placesList, popupNewCard, addCard } =
    newPlaceFormConfig;
  const { closePopup, openPopup, openCardPopup } = popupConfig;

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

    addCard(cardData.name, cardData.link)
      .then((res) => {
        placesList.prepend(
        createCard(
          res,
          cardData,
          handleDeleteCard,
          openCardPopup,
          handleLikeCard,
          userId
        )
      );
    });

    closePopup(popupNewCard);
    formNewPlace.reset();
  });
}
