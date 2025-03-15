export function initProfileForm() {
  const formProfile = document.forms.edit_profile;
  const nameInput = formProfile.elements.name;
  const jobInput = formProfile.elements.description;

  formProfile.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const title = document.querySelector(".profile__title");
    const description = document.querySelector(".profile__description");

    title.textContent = nameInput.value;
    description.textContent = jobInput.value;

    formProfile.reset();
  });
  return formProfile;
}
