const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__placeholder');
let nameInput = document.querySelector('.popup__placeholder-input_type_name');
const passionInput = document.querySelector('.popup__placeholder-input_type_passion');
let nameOrigin = document.querySelector('.profile__info-name');
const passionOrigin = document.querySelector('.profile__info-passion');

function popupEnableToggle() {
    popup.classList.add('popup_enable');
    nameInput.value = nameOrigin.textContent
    passionInput.value = passionOrigin.textContent;
}

function popupDisableToggle() {
    popup.classList.remove('popup_enable');
}

function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggle();
    }
}

function submitToogle(event) {
    event.preventDefault();
    nameOrigin.textContent = nameInput.value;
    passionOrigin.textContent = passionInput.value;
    popupDisableToggle();
}

openPopupButton.addEventListener('click', popupEnableToggle);
closePopupButton.addEventListener('click', popupDisableToggle);
popup.addEventListener('click', popupOverlayClickHandler);
formElement.addEventListener('submit', submitToogle);
  