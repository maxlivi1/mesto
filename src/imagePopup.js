const popup = document.querySelector('.popup_place_image');
const popupImage = popup.querySelector('.popup__image');
const popupSignature = popup.querySelector('.popup__signature');

export function getImagePopup (image, signature) {
  popupImage.src = image;
  popupImage.alt = `Фото ${signature}`;
  popupSignature.textContent = signature;

  return popup;
}
