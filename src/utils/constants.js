//переменные 
export const buttonOpenPopup = document.querySelector('.profile__edit-button');
export const nameInput = document.querySelector('#name');
export const passionInput = document.querySelector('#passion');
export const buttonAdd = document.querySelector('.profile__add-button');
export const toogleCreate = document.querySelector('#popup-cards-form');
export const formElement = document.querySelector('.popup__placeholder');
export const formAvatar = document.querySelector('#popup-avatar-form');
export const profileName = document.querySelector('.profile__info-name');
export const profileAbout = document.querySelector('.profile__info-passion');
export const avatar = document.querySelector('.profile__avatar');
export const avatarButton = document.querySelector('.profile__editAva-button');

//массив с настройками для enableValidation
export const obj = {
    formSelector: ".popup__placeholder",
    inputSelector: ".popup__placeholder-input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    errorText: ".popup__error"
};