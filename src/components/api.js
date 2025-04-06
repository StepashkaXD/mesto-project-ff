const url = "https://mesto.nomoreparties.co/v1/wff-cohort-35";
const token = "b9c5a04f-0e97-4430-8ee9-bf7a21ea5318";
const headers = {
  config: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

const testResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getArrayCards = () => {
  return fetch(url + "/cards", {
    method: "GET",
    headers: headers.config,
  }).then(testResponse);
};

export const getUser = () => {
  return fetch(url + "/users/me", {
    method: "GET",
    headers: headers.config,
  }).then(testResponse);
};

export const editProfile = (name, about) => {
  return fetch(url + "/users/me", {
    method: "PATCH",
    headers: headers.config,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(testResponse);
};

export const editAvatar = (link) => {
  return fetch(url + "/users/me/avatar", {
    method: "PATCH",
    headers: headers.config,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(testResponse);
};

export const addCard = (name, link) => {
  return fetch(url + "/cards", {
    method: "POST",
    headers: headers.config,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(testResponse);
};

export const deleteCard = (cardId) => {
  return fetch(url + "/cards/" + cardId, {
    method: "DELETE",
    headers: headers.config,
  }).then(testResponse);
};

export const likeCard = (cardId) => {
  return fetch(url + "/cards/" + cardId + "/likes", {
    method: "PUT",
    headers: headers.config,
  }).then(testResponse);
};

export const unlikeCard = (cardId) => {
  return fetch(url + "/cards/" + cardId + "/likes", {
    method: "DELETE",
    headers: headers.config,
  }).then(testResponse);
};
