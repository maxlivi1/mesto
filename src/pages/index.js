import './index.css';
import '../../README.md';
import {
  cardCssOptions,
  validatorConfig,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddNewPlace,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConsentToDeletion from '../components/PopupConsentToDeletion.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

const api = new Api({});
let user = null;

const popupDeletePlace = new PopupConsentToDeletion('#popup-delete-place', () => {
  const deletionObject = popupDeletePlace.getDeletionObject();
  // выполнить до загрузки
  api.deletePlace({ cardId: deletionObject.id })
  .then(() => {
    deletionObject.element.remove();
  })
  .catch(error => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    // выполнить после загрузки
  })
});
popupDeletePlace.setEventListeners();

const popupChangeAvatar = new PopupWithForm('#popup-change-avatar', (inputData => {
  // выполнить до загрузки
  api.changeUserAvatar({ newAvatar: inputData['change-avatar__link'] })
  .then(userData => {
    user.setUserAvatar({ newAvatar: userData.avatar });
  })
  .catch(error => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    // выполнить после загрузки
  })
}));
popupChangeAvatar.setEventListeners();
const formChangeAvatarValidator = new FormValidator(validatorConfig, popupChangeAvatar.getForm());
formChangeAvatarValidator.enableValidation();

// выполнить до загрузки
api.getUserData()
  .then(userData => {
    user = new UserInfo({
      userAvatarSelector: '.profile__avatar',
      userNameSelector: '#profile-name',
      userInfoSelector: '#profile-info',
    }, { id: userData._id, name: userData.name, about: userData.about, avatar: userData.avatar },
    () => {
      formChangeAvatarValidator.resetValidation();
      popupChangeAvatar.open();
    });
    user.setListeners();
    user.setUserInfo(
      {
        newName: user.getUserInfo().name,
        newInfo: user.getUserInfo().about
      })
    user.setUserAvatar({ newAvatar: user.getUserInfo().avatar });
    // console.log('UserId: ', user.getId());
  })
  .catch(error => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    // выполнить после загрузки
  })

const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();

function handleCardClick({ imageSrc, signatureText }) {
  popupImage.open({ imageSrc, signatureText });
}

function generateCard(dataCard, userId, handleCard, handleDelete, selector, options) {
  const card = new Card({ data: dataCard, userId }, { handleCardClick: handleCard, handleDeleteClick: handleDelete }, selector, options);
  return card.createCard();
}

function handleDeleteClick(deletionObject) {
  popupDeletePlace.open(deletionObject);
}

const cardsSectionRenderer = new Section({
  renderer: (item) => {
    // console.log(item.owner._id);
    cardsSectionRenderer.addItem(generateCard(item, user.getId(), handleCardClick, handleDeleteClick, '#place-card', cardCssOptions));
  }
}, '.places');

function handleSubmitAddPlace(inputsData) {
  // выполнить до загрузки
  api.addNewPlace(
    { placeName: inputsData['add-form__name'],
      imageUrl: inputsData['add-form__link']
    })
    .then(resData => {
      cardsSectionRenderer.addItem(
        generateCard(resData, user.getId(), handleCardClick, handleDeleteClick, '#place-card', cardCssOptions));
    })
    .catch(error => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      // выполнить после загрузки
    })
}

const popupPlace = new PopupWithForm('#popup-add', handleSubmitAddPlace);
popupPlace.setEventListeners();

const formAddNewPlaceValidator = new FormValidator(validatorConfig, popupPlace.getForm());
formAddNewPlaceValidator.enableValidation();

function handleOpenPopupAddPlace(event) {
  event.preventDefault();
  formAddNewPlaceValidator.resetValidation();
  popupPlace.open();
}

buttonOpenPopupAddNewPlace.addEventListener('click', handleOpenPopupAddPlace);

function handleSubmitUserInfo(inputsData) {
  // выполнить до загрузки
  api.changeUserInfo({
    newName: inputsData['edit-form__name'],
    newInfo: inputsData['edit-form__information'],})
    .then(userData => {
      user.setUserInfo({
        newName: userData.name,
        newInfo: userData.about,
      });
    })
    .catch(error => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      // выполнить после загрузки
    })
}

const popupEdit = new PopupWithForm('#popup-edit', handleSubmitUserInfo);
popupEdit.setEventListeners();

const formEditProfileValidator = new FormValidator(validatorConfig, popupEdit.getForm());
formEditProfileValidator.enableValidation();

function handleOpenPopupProfile(event) {
  event.preventDefault();

  const { name, about } = user.getUserInfo();
  const formElements = popupEdit.getForm().elements;

  formElements['edit-form__name'].value = name;
  formElements['edit-form__information'].value = about;

  formEditProfileValidator.resetValidation();
  popupEdit.open();
}

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupProfile);

// выполнить до загрузки
api.getInitialCards()
  .then(dataCards => {
    cardsSectionRenderer.rendereItems({ items: dataCards });
  })
  .catch(error => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    // выполнить после загрузки
  })
