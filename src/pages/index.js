import './index.css';
import '../../README.md';
import {
  cardCssOptions,
  validatorConfig,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddNewPlace,
  apiOptions
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConsentToDeletion from '../components/PopupConsentToDeletion.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

const api = new Api(apiOptions);
let user = null;

const popupDeletePlace = new PopupConsentToDeletion('#popup-delete-place', () => {
  const deletionObject = popupDeletePlace.getDeletionObject();
  api.deletePlace({ placeId: deletionObject.id })
  .then(() => {
    deletionObject.element.remove();
  })
  .catch(error => {
    console.log(`Что-то пошло не так: ${error}`);
  })
});
popupDeletePlace.setEventListeners();

const popupChangeAvatar = new PopupWithForm('#popup-change-avatar', (inputData => {
  popupChangeAvatar.switchDownload('Сохранение...');
  api.updateUserAvatar({ newAvatar: inputData['change-avatar__link'] })
  .then(userData => {
    user.setUserAvatar({ newAvatar: userData.avatar });
  })
  .catch(error => {
    console.log(`Что-то пошло не так: ${error}`);
  })
  .finally(() => {
    popupChangeAvatar.switchDownload('Сохранить');
  })
}));
popupChangeAvatar.setEventListeners();
const formChangeAvatarValidator = new FormValidator(validatorConfig, popupChangeAvatar.getForm());
formChangeAvatarValidator.enableValidation();

const popupImage = new PopupWithImage('#popup-image');
popupImage.setEventListeners();

function handleCardClick({ imageSrc, signatureText }) {
  popupImage.open({ imageSrc, signatureText });
}

function generateCard(dataCard, userId, handleCard, handleDelete, handleLike, selector, options) {
  const card = new Card(
    { data: dataCard, userId },
    { handleCardClick: handleCard, handleDeleteClick: handleDelete, handleLikeClick: handleLike },
    selector, options);
  return card.createCard();
}

function handleDeleteClick(deletionObject) {
  popupDeletePlace.open(deletionObject);
}

function handleLikeClick(place) {
  api.likePlace({ isLiked: place.isLiked(), placeId: place.getId() })
  .then((resData) => {
    place.setLikes(resData.likes);
  })
  .catch(error => {
    console.log(`Что-то пошло не так: ${error}`);
  })
  .finally(() => {
  })
}

const cardsSectionRenderer = new Section({
  renderer: (item) => {
    cardsSectionRenderer.addItem(generateCard(item, user.getId(), handleCardClick, handleDeleteClick, handleLikeClick, '#place-card', cardCssOptions));
  }
}, '.places');

const popupAddPlace = new PopupWithForm('#popup-add', (inputsData) => {
  popupAddPlace.switchDownload('Сохранение...');
  api.createPlace(
    { placeName: inputsData['add-form__name'],
      imageUrl: inputsData['add-form__link']
    })
    .then(resData => {
      cardsSectionRenderer.addItem(generateCard(resData, user.getId(), handleCardClick, handleDeleteClick, handleLikeClick, '#place-card', cardCssOptions));
    })
    .catch(error => {
      console.log(`Что-то пошло не так: ${error}`);
    })
    .finally(() => {
      popupAddPlace.switchDownload('Создать');
    })
});
popupAddPlace.setEventListeners();
const formAddNewPlaceValidator = new FormValidator(validatorConfig, popupAddPlace.getForm());
formAddNewPlaceValidator.enableValidation();

function handleOpenPopupAddPlace(event) {
  event.preventDefault();
  formAddNewPlaceValidator.resetValidation();
  popupAddPlace.open();
}

buttonOpenPopupAddNewPlace.addEventListener('click', handleOpenPopupAddPlace);

const popupEditUserInfo = new PopupWithForm('#popup-edit', (inputsData) => {
  popupEditUserInfo.switchDownload('Сохранение...');
  api.updateUserInfo(
    {
    newName: inputsData['edit-form__name'],
    newInfo: inputsData['edit-form__information'],
    })
    .then(userData => {
      user.setUserInfo({
        newName: userData.name,
        newInfo: userData.about,
      });
    })
    .catch(error => {
      console.log(`Что-то пошло не так: ${error}`);
    })
    .finally(() => {
      popupEditUserInfo.switchDownload('Сохранить');
    })
});
popupEditUserInfo.setEventListeners();
const formEditProfileValidator = new FormValidator(validatorConfig, popupEditUserInfo.getForm());
formEditProfileValidator.enableValidation();

function handleOpenPopupProfile(event) {
  event.preventDefault();

  const { name, about } = user.getUserInfo();
  const formElements = popupEditUserInfo.getForm().elements;

  formElements['edit-form__name'].value = name;
  formElements['edit-form__information'].value = about;

  formEditProfileValidator.resetValidation();
  popupEditUserInfo.open();
}

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupProfile);

Promise.all([api.readUser(), api.readInitialPlaces()])
.then(serverData => {
  user = new UserInfo({
    userAvatarSelector: '.profile__avatar',
    userNameSelector: '#profile-name',
    userInfoSelector: '#profile-info',
  },
  {
    id: serverData[0]._id,
    name: serverData[0].name,
    about: serverData[0].about,
    avatar: serverData[0].avatar
  },
  () => {
    formChangeAvatarValidator.resetValidation();
    popupChangeAvatar.open();
  });
  user.setListeners();
  user.renderUserInfo();

  cardsSectionRenderer.rendereItems({ items: serverData[1] });
})
.catch(error => {
  console.log(`Что-то пошло не так: ${error}`);
})
