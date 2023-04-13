export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards',
    {
      headers: {
        authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status} : ${response.statusText}`);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  addNewPlace({ placeName, imageUrl }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards',
    {
      method: 'POST',
      headers: {
        authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: placeName,
        link: imageUrl
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status} : ${response.statusText}`);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  deletePlace({ cardId }) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}`,
    {
      method: 'DELETE',
      headers: {
        authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea',
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status} : ${response.statusText}`);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  getUserData() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me',
    {
      headers: {
        authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status} : ${response.statusText}`);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  changeUserInfo({ newName, newInfo }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me',
    {
      method: 'PATCH',
      headers: {
        authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newInfo
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status} : ${response.statusText}`);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }

  changeUserAvatar({ newAvatar }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar',
    {
      method: 'PATCH',
      headers: {
        authorization: 'c6eeac48-21b1-4b11-8e1a-276b18a235ea',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status} : ${response.statusText}`);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    })
  }
}


