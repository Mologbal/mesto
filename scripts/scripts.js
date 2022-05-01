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
const openPopupButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__placeholder-input_type_name');
const passionInput = document.querySelector('.popup__placeholder-input_type_passion');
const nameOrigin = document.querySelector('.profile__info-name');
const passionOrigin = document.querySelector('.profile__info-passion');
const saveButton = document.querySelector('.popup__save-button')
const closePopupButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-cards');
const createToogle = document.querySelector('#popup-cards-form');
const closePopupButtonCards = document.querySelector('#popup-cards-close-button');
const cardsContainer = document.querySelector('.elements');
const contentDelete = document.querySelector('.elements__delete-button');
const templateCards = document.querySelector('.template-cards').content;
const formElement = document.querySelector('.popup__placeholder');
const savePlace = document.querySelector('#popupCards-save-button')
const closeAp = document.querySelector('#popup-approximation-close-button')
const popupImgApproach = document.querySelector('#popup-approximation')
const popupImage = document.querySelector(".popup__image");
const ImageTitle = document.querySelector(".popup__image-title");
const imgcard = document.querySelector(".elements__element-image");
const cardtext = document.querySelector(".elements__element-subtitle");
const name = document.querySelector('#popup-cards-name');
const link = document.querySelector('#popup-cards-link');

//Открыть попап-ы
function openPopup(popupProfile) {
    popupProfile.classList.add('popup_enable');
}

//Закрыть попап-ы
function closePopup(popupProfile) {
    popupProfile.classList.remove('popup_enable');
}

// Закрытие попап-ов по клику за пределы их окон
function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
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

//Функция создания карточки (после 1го ревью)
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

//Функция добавления карточки в контейнер (после 1го ревью)
const addCard = (cardsInformation) => {
    cardsContainer.prepend(createCard(cardsInformation));
}

//обработчик увеличивающего попапа (после 1го ревью)
function imagePopUpHandler(cardsInformation) {
    popupImage.src = cardsInformation.link;
    popupImage.alt = cardsInformation.name;
    ImageTitle.textContent = cardsInformation.name;
    openPopup(popupImgApproach);
}

//Функция для изначальных карточек (после 1го ревью)
initialCards.forEach((cardsInformation) => {
    addCard(cardsInformation);
})

//Список нужных addEventListener-ов вне функций (после 1го ревью)
const formSubmitHandlerCard = (event) => {
    event.preventDefault();
    addCard({
        name: name.value,
        link: link.value
    });
    closePopup(popupAddCard);
    createToogle.reset(); //Большое спасибо, теперь понял, кошмар пытался инпуты ресетать больше 2х часов! C:
}

createToogle.addEventListener('submit', formSubmitHandlerCard)

openPopupButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    nameInput.value = nameOrigin.textContent;
    passionInput.value = passionOrigin.textContent;
    openPopup(popupProfile);
});
closePopupButton.addEventListener('click', () => closePopup(popupProfile));
popupProfile.addEventListener('click', handleOverlayClose);
formElement.addEventListener('submit', popupProfileSaveButton);
addButton.addEventListener('click', () => openPopup(popupAddCard));
closePopupButtonCards.addEventListener('click', () => closePopup(popupAddCard));
popupAddCard.addEventListener('click', handleOverlayClose);
closeAp.addEventListener('click', () => closePopup(popupImgApproach));
popupImgApproach.addEventListener('click', handleOverlayClose)