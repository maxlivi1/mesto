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
    .then(data => data)
    .catch(error => {
      errorMessage = error;
      console.log(`Error: ${error}`);
    })
  }
}


