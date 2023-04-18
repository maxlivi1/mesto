export default class Api {
  constructor(options) {
    this._options = options;
  }

  static checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status} : ${response.statusText}`);
  }

  getInitialPlaces() {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.places}`,
    { headers: this._options.headers })
    .then(Api.checkResponse);
  }

  createPlace({ placeName, imageUrl }) {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.places}`,
    {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({ name: placeName, link: imageUrl })
    })
    .then(Api.checkResponse);
  }

  deletePlace({ placeId }) {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.places}/${placeId}`,
    { method: 'DELETE', headers: this._options.headers })
    .then(Api.checkResponse);
  }

  getUser() {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.user}`,
    { headers: this._options.headers })
    .then(Api.checkResponse);
  }

  updateUserInfo({ newName, newInfo }) {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.user}`,
    {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ name: newName, about: newInfo })
    })
    .then(Api.checkResponse);
  }

  updateUserAvatar({ newAvatar }) {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.userAvatar}`,
    {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ avatar: newAvatar })
    })
    .then(Api.checkResponse);
  }

  _createLikePlace(placeId) {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.places}/${placeId}${this._options.requestTo.likes}`,
      { method: 'PUT', headers: this._options.headers })
      .then(Api.checkResponse);
  }

  _deleteLikePlace(placeId) {
    return fetch(`${this._options.baseUrl}${this._options.requestTo.places}/${placeId}${this._options.requestTo.likes}`,
      { method: 'DELETE', headers: this._options.headers })
      .then(Api.checkResponse);
  }

  likePlace({ isLiked, placeId }) {
    if (isLiked) {
      return this._deleteLikePlace(placeId);
    } else {
      return this._createLikePlace(placeId);
    }
  }
}
