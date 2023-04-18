export default class UserInfo {

  constructor(
    {
      userAvatarSelector,
      userNameSelector,
      userInfoSelector,
      userAvatarChangeButtonSelector
    }, { id, name, about, avatar }, handleChangeAvatar) {
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._userAvatarButtonElement = document.querySelector(userAvatarChangeButtonSelector);
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userInfoSelector);
    this._id = id;
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._handleChangeAvatar = handleChangeAvatar;
  }

  getId() {
    return this._id;
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name,
      about: this._about,
      avatar: this._avatar,
    }
  }

  setListeners() {
    this._userAvatarButtonElement.addEventListener('click', () => {
      this._handleChangeAvatar();
    })
  }

  renderUserInfo() {
    this._userNameElement.textContent = this._name;
    this._userAboutElement.textContent = this._about;
    this._userAvatarElement.src = this._avatar;
  }

  setUserInfo({ newName, newInfo }) {
    this._name = newName;
    this._about = newInfo;
    this._userNameElement.textContent = this._name;
    this._userAboutElement.textContent = this._about;
  }

  setUserAvatar({ newAvatar }) {
    this._avatar = newAvatar;
    this._userAvatarElement.src = this._avatar;
  }
}
