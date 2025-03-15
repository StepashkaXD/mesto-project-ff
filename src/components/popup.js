export function initPopup(popup, target, form = null) {
  const buttonClose = popup.querySelectorAll(".popup__close");

  function openPopup() {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEsc);
  }

  function closePopup() {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEsc);
    if (form) {
      form.reset();
    }
  }

  function handleEsc(event) {
    if (event.key === "Escape") {
      closePopup();
    }
  }

  target.addEventListener("click", () => {
    openPopup();
  });

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
    }
  });

  buttonClose.forEach((button) => {
    button.addEventListener("click", (evt) => {
      evt.preventDefault(), 
      closePopup();
    });
  });

  if (form) {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault(), closePopup();
    });
  }
  return { openPopup, closePopup };
}

export function openCardPopup(cardData) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  const popupImage = popupTypeImage.querySelector(".popup__image");
  const popupImageDescription = popupTypeImage.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageDescription.textContent = cardData.name;

  const { openPopup } = initPopup(popupTypeImage, popupImage);
  openPopup();
}
