export default class UserInfo {

  constructor({ userNameSelector, userInfoSelector }) {
    this._userNameLable = document.querySelector(userNameSelector);
    this._userInfoLable = document.querySelector(userInfoSelector);
    this._name = this._userNameLable.textContent;
    this._info = this._userInfoLable.textContent;
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
    }
  }

  setUserInfo({ newName, newInfo }) {
    this._userNameLable.textContent = this._name = newName;
    this._userInfoLable.textContent = this._info = newInfo;
  }
}
