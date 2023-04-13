export default class UserInfo {

  constructor(
    {
      userAvatarSelector,
      userNameSelector,
      userInfoSelector
    }, { id, name, about, avatar }, handleChangeAvatar) {
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._userAvatarButtonElement = document.querySelector('.profile__btn-change');
    this._userAvatarButtonActiveClass = 'profile__btn-change_active';
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
    this._userAvatarElement.addEventListener('mouseover', () => {
      this._userAvatarButtonElement.classList.add(this._userAvatarButtonActiveClass);
    });
    this._userAvatarButtonElement.addEventListener('mouseout', () => {
      this._userAvatarButtonElement.classList.remove(this._userAvatarButtonActiveClass);
    })
    this._userAvatarButtonElement.addEventListener('click', () => {
      this._handleChangeAvatar();
    })
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
