const popup = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popup.querySelector('.popup__close-button');

function popupEnableToggle() {
    popup.classList.add('popup__enable');
}

//Если пользователь ввел данные и не сохранил их.
function popupDisableToggle() {
    popup.classList.remove('popup__enable');
    nameInput.value = nameOrigin.textContent
    passionInput.value = passionInput.value;
}

function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggle();
    }
}



openPopupButton.addEventListener('click', popupEnableToggle);
closePopupButton.addEventListener('click', popupDisableToggle);
popup.addEventListener('click', popupOverlayClickHandler);

const formElement = document.querySelector('.popup__placeholder');
let nameInput = document.querySelector('.popup__placeholder-name');
const passionInput = document.querySelector('.popup__placeholder-passion');
let nameOrigin = document.querySelector('.profile__info-name');
const passionOrigin = document.querySelector('.profile__info-passion');

document.querySelector('.popup__placeholder').addEventListener('submit', (event) => {
    event.preventDefault();

    nameOrigin.textContent = nameInput.value;
    passionOrigin.textContent = passionInput.value;

    popupDisableToggle();

})