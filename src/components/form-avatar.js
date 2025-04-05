export function initAvatarForm(settings) {
  const {
    avatarConfig: {
      avatarButton,
      popupAvatar, 
      formAvatar,
      editAvatar,
      profileAvatar
    },
    popupConfig: { 
      closePopup,
      openPopup 
    },
    validationConfig,
    clearValidation,
    userId
  } = settings;


  const updateProfile = (link) => {
    return editAvatar(link)
      .then(() => {
        profileAvatar.style.backgroundImage = `url(${link})`;
        closePopup(popupAvatar);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении аватара:", error);
      });
  };

  avatarButton.addEventListener("click", () => {
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
    openPopup(popupAvatar);
  });

  formAvatar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const link = formAvatar.link.value;
    updateProfile(link)
    .then(() => {
      formAvatar.reset();
    })
  })
}