//переменные которые используются в проекте вне функций
const popupProfile = document.querySelector('.popup');
const buttonOpenPopup = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__placeholder-input_type_name');
const passionInput = document.querySelector('.popup__placeholder-input_type_passion');
const nameOrigin = document.querySelector('.profile__info-name');
const nameEr = document.querySelector('#error-name');
const namePas = document.querySelector('#error-passion');
const namePlace = document.querySelector('#error-place');
const nameLink = document.querySelector('#error-link');
const passionOrigin = document.querySelector('.profile__info-passion');
const buttonSave = document.querySelector('.popup__save-button');
const buttonClosePopup = document.querySelector('.popup__close-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-cards');
const toogleCreate = document.querySelector('#popup-cards-form');
const buttonClosePopupCards = document.querySelector('#popup-cards-close-button');
const cardsContainer = document.querySelector('.elements');
const contentDelete = document.querySelector('.elements__delete-button');
const templateCards = document.querySelector('.template-cards').content;
const formElement = document.querySelector('.popup__placeholder');
const placeSave = document.querySelector('#popupCards-save-button');
const apClose = document.querySelector('#popup-approximation-close-button');
const popupImgApproach = document.querySelector('#popup-approximation');
const popupImage = document.querySelector(".popup__image");
const imageTitle = document.querySelector(".popup__image-title");
const imgcard = document.querySelector(".elements__element-image");
const cardtext = document.querySelector(".elements__element-subtitle");
const place = document.querySelector('#place');
const link = document.querySelector('#link');
const profileSave = document.querySelector('#saveProfile');




//Функции Проекта

//Открыть попап-ы
function openPopup(popupProfile) {
  popupProfile.classList.add('popup_enable');
  document.addEventListener('keydown', handleOverlayCloseEsc);
}

//Закрыть попап-ы
function closePopup(popupProfile) {
  popupProfile.classList.remove('popup_enable');
  document.removeEventListener('keydown', handleOverlayCloseEsc);
}

// Закрытие попап-ов по клику за пределы их окон
function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    const popupAcrive = document.querySelector(".popup_enable");
    closePopup(popupAcrive);
  }
}

//Закрытие попапов по нажатию 'Esc'
function handleOverlayCloseEsc(evt) {
  if (evt.key === 'Escape') {
    const popupAcrive = document.querySelector(".popup_enable");
    closePopup(popupAcrive);
  }
}

//Кнопка сохранить попапа Профиля
function popupProfileSaveButton(event) {
  event.preventDefault();
  nameOrigin.textContent = nameInput.value;
  passionOrigin.textContent = passionInput.value;
  closePopup(popupProfile);
}

//Функция создания карточки
const createCard = (cardsInformation) => {
  const cardElement = templateCards.cloneNode(true);
  cardElement.querySelector('.elements__element-image').src = cardsInformation.link;
  cardElement.querySelector('.elements__element-image').alt = cardsInformation.name;
  cardElement.querySelector('.elements__element-subtitle').textContent = cardsInformation.name;
  cardElement.querySelector('.elements__element-like').addEventListener('click', function (event) {
    event.target.classList.toggle('elements__element-like_activated');
  })
  cardElement.querySelector('.elements__delete-button').addEventListener('click', function (event) {
    event.target.closest('.elements__element').remove();
  })
  cardElement.querySelector('.elements__element-image').addEventListener('click', function (event) {
    imagePopUpHandler(cardsInformation);
  })
  return cardElement;
}

//Функция добавления карточки в контейнер
const addCard = (cardsInformation) => {
  cardsContainer.prepend(createCard(cardsInformation));
}

//обработчик увеличивающего попапа
function imagePopUpHandler(cardsInformation) {
  popupImage.src = cardsInformation.link;
  popupImage.alt = cardsInformation.name;
  imageTitle.textContent = cardsInformation.name;
  openPopup(popupImgApproach);
}

//Функция для изначальных карточек
initialCards.forEach((cardsInformation) => {
  addCard(cardsInformation);
})

//функция добавляющая в новую карточку необходимые данные
const formSubmitHandlerCard = (event) => {
  event.preventDefault();
  addCard({
    name: place.value,
    link: link.value,
  });
  closePopup(popupAddCard);
  toogleCreate.reset();
}


//Список нужных addEventListener-ов вне функций 
toogleCreate.addEventListener('submit', formSubmitHandlerCard);

buttonOpenPopup.addEventListener('click', function (evt) {
  evt.preventDefault();
  nameInput.value = nameOrigin.textContent;
  passionInput.value = passionOrigin.textContent;
  letscleanErrors(validationConfig);
  enableValidation(validationConfig);
  openPopup(popupProfile);
});
buttonClosePopup.addEventListener('click', () => closePopup(popupProfile));
popupProfile.addEventListener('click', handleOverlayClose);
buttonAdd.addEventListener('click', function () {
  toogleCreate.reset();
  letscleanErrors(validationConfig);
  enableValidation(validationConfig);
  openPopup(popupAddCard);
})
buttonClosePopupCards.addEventListener('click', function () {
  closePopup(popupAddCard);
})
popupAddCard.addEventListener('click', handleOverlayClose);
apClose.addEventListener('click', () => closePopup(popupImgApproach));
popupImgApproach.addEventListener('click', handleOverlayClose);
profileSave.addEventListener('click', popupProfileSaveButton);
//закрытие попапов по 'Esc'