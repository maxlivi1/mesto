export default class UserInfo {

  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameLable = document.querySelector(userNameSelector);
    this._userInfoLable = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameLable.textContent,
      info: this._userInfoLable.textContent,
    }
  }

  setUserInfo({ newName, newInfo }) {
    this._userNameLable.textContent = newName.trim();
    this._userInfoLable.textContent = newInfo.trim();
  }
}
