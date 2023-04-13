import PopupSubmitOnly from "./PopupSubmitOnly.js";

export default class PopupConsentToDeletion extends PopupSubmitOnly {

  constructor(selector, handleFormSubmit) {
    super(selector, handleFormSubmit);
  }

  open(deletionObject) {
    this._deletionObject = deletionObject;
    super.open();
  }

  getDeletionObject() {
    return this._deletionObject;
  }
}
