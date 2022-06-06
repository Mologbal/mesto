import {
  Card
} from "./Card.js";
import {
  FormValidator
} from "./FormValidator.js";
import {
  obj
} from './FormValidator.js';


//Массив с изначальными карточками
const initialCards = [{
    name: 'Юловский пруд',
    link: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/a1/eb/63/caption.jpg?w=1200&h=-1&s=1'
  },
  {
    name: 'Горы Шиханы',
    link: 'https://nashural.ru/assets/uploads/sterlitamak-shihany06.jpg'
  },
  {
    name: 'Чарские пески',
    link: 'https://www.russiadiscovery.ru/upload/files/files/Чарские_пески.jpg'
  },
  {
    name: 'Куршская коса',
    link: 'https://www.russiadiscovery.ru/upload/files/files/Национальный_парк_Куршская_коса_4.jpg'
  },
  {
    name: 'Остров Врангеля',
    link: 'https://www.russiadiscovery.ru/upload/files/files/Kruiz%20na%20ostrov%20Vrangelya_35%281%29.jpg'
  },
  {
    name: 'Большой Тxач',
    link: 'https://cdn.lifehacker.ru/wp-content/uploads/2019/05/Txach_Artyem_Kharchenko-Shutterstock_1599818258.jpg'
  }
];


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

//обработчик увеличивающего попапа
function imagePopUpHandler(cardsInformation) {
  popupImage.src = cardsInformation.link;
  popupImage.alt = cardsInformation.name;
  imageTitle.textContent = cardsInformation.name;
  openPopup(popupImgApproach);
}

//!!Секция функций которые работают с модулем "Card"!!

//Функция добавления карточки в контейнер
const addCard = (cardsContainer, newCard) => {
  cardsContainer.prepend(newCard);
}

//Функция создания карточки
const createCard = (cardsInformation) => {
  const newCard = new Card(cardsInformation, 'template__element', imagePopUpHandler);
  return newCard.generateCard(cardsInformation);
}

//Функция для изначальных карточек
initialCards.forEach((cardsInformation) => {
  const newCard = createCard(cardsInformation);
  addCard(cardsContainer, newCard)
})

//функция добавляющая в новую карточку необходимые данные
const formSubmitHandlerCard = (event) => {
  event.preventDefault();
  addCard(cardsContainer, createCard({
    name: place.value,
    link: link.value,
  }))
  closePopup(popupAddCard);
  toogleCreate.reset();
}

//Список нужных addEventListener-ов вне функций 
toogleCreate.addEventListener('submit', formSubmitHandlerCard);
buttonClosePopupCards.addEventListener('click', function () {
  closePopup(popupAddCard);
})
buttonClosePopup.addEventListener('click', () => closePopup(popupProfile));
popupProfile.addEventListener('click', handleOverlayClose);
popupAddCard.addEventListener('click', handleOverlayClose);
apClose.addEventListener('click', () => closePopup(popupImgApproach));
popupImgApproach.addEventListener('click', handleOverlayClose);
profileSave.addEventListener('click', popupProfileSaveButton);

//!!Секция слушателей работающих с модулем 'FormValidator'!!
const validationEditPopup = new FormValidator(formElement, obj) //для попапа с профилем
buttonOpenPopup.addEventListener('click', function (evt) {
  evt.preventDefault();
  nameInput.value = nameOrigin.textContent;
  passionInput.value = passionOrigin.textContent;
  validationEditPopup.letscleanErrors(); //очистит поля сообщений ошибок, при повторном открытии попапа
  validationEditPopup.enableValidation(); //проверит текст пользователя на предмет ошибок
  openPopup(popupProfile);
});

const validationCardPopup = new FormValidator(toogleCreate, obj) // для попапа с карточками
buttonAdd.addEventListener('click', function () {
  toogleCreate.reset();
  validationCardPopup.letscleanErrors();
  validationCardPopup.toggleButtonState(); // не даст отправить пустую карточку, сразу при открытии
  validationCardPopup.enableValidation();
  openPopup(popupAddCard);
})