export function initProfileForm(settings) {
  const {
    profileFormConfig: {
      editButton,
      formProfile,
      titleProfile,
      descriptionProfile,
      popupProfile,
      editProfile,
    },
    popupConfig: { 
      closePopup,
      openPopup 
    },
    validationConfig,
    clearValidation,
  } = settings;

  const setFormValues = () => {
    formProfile.elements.name.value = titleProfile.textContent;
    formProfile.elements.description.value = descriptionProfile.textContent;
  };

  const updateProfile = (name, about) => {
    return editProfile(name, about)
      .then(() => {
        titleProfile.textContent = name;
        descriptionProfile.textContent = about;
        closePopup(popupProfile);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении профиля:", error);
      });
  };
  
  editButton.addEventListener("click", () => {
    setFormValues();
    clearValidation(formProfile, validationConfig);
    openPopup(popupProfile);
  });

  formProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = formProfile.elements.name.value;
    const about = formProfile.elements.description.value;
    updateProfile(name, about);
  });
}
