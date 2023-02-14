const initialCards = [
{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

const animationTime = 400;

const profileName = document.querySelector('#profile-name');
const profileInfo = document.querySelector('#profile-info');

const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImage = document.querySelector('#popup-image');

const editForm = document.querySelector('#edit-form');
const editFormName = editForm.querySelector('#edit-form__name');
const editFormInfo = editForm.querySelector('#edit-form__information');

const addForm = document.querySelector('#add-form');
const addFormName = addForm.querySelector('#add-form__name');
const addFormLink = addForm.querySelector('#add-form__link');

const buttonEditClose = document.querySelector('#form-edit__btn-close');
const buttonAddClose = document.querySelector('#form-add__btn-close');
const buttonImageClose = document.querySelector('#form-image__btn-close');
const buttonFormSave = document.querySelector('#edit-form__btn-save');
const buttonFormOpen = document.querySelector('#button_open-form');
const buttonAddPlace = document.querySelector('#add-place-btn');

const placesCards = document.querySelector('.places');

// вытаскиваем контент из шаблона
const placeCardTemplate = document.querySelector('#place-card').content;

function openPopupEdit() {
  editFormName.value = profileName.textContent;
  editFormInfo.value = profileInfo.textContent;
  popupEdit.classList.add('popup_opened');
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function openPopupImage(event) {
  event.preventDefault();
  const place = event.target.closest('.place');
  popupImage.querySelector('.popup__image').src = place.querySelector('.place__photo').src;
  popupImage.querySelector('.popup__image').alt = place.querySelector('.place__photo').alt;
  popupImage.querySelector('.popup__signature').textContent = place.querySelector('.place__name').textContent;
  popupImage.classList.add('popup_opened');
}

function makeLike(event) {
  event.target.classList.toggle('place__btn-like_active');
}

function closePopupEdit() {
  popupEdit.querySelector('.popup__container').classList.add('popup__container_condition_hide');
  setTimeout(() => {
    popupEdit.classList.remove('popup_opened');
    popupEdit.querySelector('.popup__container').classList.remove('popup__container_condition_hide');
    editFormName.value = '';
    editFormInfo.value = '';
  }, animationTime);
}

function closePopupAdd() {
  popupAdd.querySelector('.popup__container').classList.add('popup__container_condition_hide');
  setTimeout(() => {
    popupAdd.classList.remove('popup_opened');
    popupAdd.querySelector('.popup__container').classList.remove('popup__container_condition_hide');
    addFormName.value = '';
    addFormLink.value = '';
  }, animationTime);
}

function closePopupImage() {
  popupImage.querySelector('.popup__image-wrapper').classList.add('popup__image-wrapper_condition_hide');
  setTimeout(() => {
    popupImage.classList.remove('popup_opened');
    popupImage.querySelector('.popup__image-wrapper').classList.remove('popup__image-wrapper_condition_hide');
  }, animationTime);
}

function saveProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = editFormName.value.trim();
  profileInfo.textContent = editFormInfo.value.trim();
  closePopupEdit();
}

function deletePlace(event) {
  const place = event.target.closest('.place');
  place.classList.add('place_condition_hide');
  setTimeout(() => {
    place.remove();
  }, animationTime);
}

buttonFormOpen.addEventListener('click', openPopupEdit);
buttonEditClose.addEventListener('click', closePopupEdit);
editForm.addEventListener('submit', saveProfileInfo);

initialCards.forEach((item) => {
  addNewPlace(item.name, item.link);
});

function addNewPlace(name, imgSrc) {

  // клонируем содержимое тега template

  const placeCard = placeCardTemplate.querySelector('.place').cloneNode(true);

  // наполняем содержимым

  placeCard.querySelector('.place__photo').src = imgSrc.trim();
  placeCard.querySelector('.place__photo').alt = 'Фото ' + name.trim();
  placeCard.querySelector('.place__name').textContent = name.trim();

  // добавляем слушателя к кнопке лайк

  addListenerForLike(placeCard.querySelector('.place__btn-like'));

  // добавляем слушателя к кнопке удалить

  addListenerForDelete(placeCard.querySelector('.place__btn-delete'));

  // добавляем слушателя к ссылке на фото

  addListenerForImage(placeCard.querySelector('.place__photo-link'));

  // отображаем карточку на странице, в начале списка

  placesCards.prepend(placeCard);
  // конец

  // closeFormAdd();
}

buttonAddPlace.addEventListener('click', openPopupAdd);
buttonAddClose.addEventListener('click', closePopupAdd);
buttonImageClose.addEventListener('click', closePopupImage);
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewPlace (addFormName.value, addFormLink.value);
  closePopupAdd();
});

function addListenerForLike (button) {
  button.addEventListener('click', makeLike);
}

function addListenerForDelete (button) {
  button.addEventListener('click', deletePlace);
}

function addListenerForImage (button) {
  button.addEventListener('click', openPopupImage);
}

