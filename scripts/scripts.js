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
const popupCards = document.querySelector('#popup-cards');
const createToogle = document.querySelector('#popup-cards-form');
const closePopupButtonCards = document.querySelector('#popup-cards-close-button');
const cardsContainer = document.querySelector('.elements');
const contentDelete = document.querySelector('.elements__delete-button');
const templateCards = document.querySelector('.template-cards').content;
const formElement = document.querySelector('.popup__placeholder');
const savePlace = document.querySelector('#popupCards-save-button')
const closeAp = document.querySelector('#popup-approximation-close-button')
const popupAp = document.querySelector('#popup-approximation')
const popupImage = document.querySelector(".popup__image");
const ImageTitle = document.querySelector(".popup__image-title");
const imgcard = document.querySelector(".elements__element-image");
const cardtext = document.querySelector(".elements__element-subtitle");
const name = document.querySelector('#popup-cards-name');
const link = document.querySelector('#popup-cards-link');

//Открыть попап Профиля
function popupEnableToggle(popupProfile) {
    popupProfile.classList.add('popup_enable');
}

//Закрыть попап Профиля
function popupDisableToggle(popupProfile) {
    popupProfile.classList.remove('popup_enable');
}

// Закрыть нажав по области вокруг попапа Профиля
function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggle(popupProfile);
    }
}

//Кнопка сохранить попапа Профиля
function popupProfileSaveButton(event) {
    event.preventDefault();
    nameOrigin.textContent = nameInput.value;
    passionOrigin.textContent = passionInput.value;
    popupDisableToggle(popupProfile);
}

//Открыть попап(карточки)
function popupEnableToggleCards(popupCards) {
    popupCards.classList.add('popup_enable');
}

//закрыть попап (карточки)
function popupDisableToggleCards() {
    popupCards.classList.remove('popup_enable');
}

// Закрыть нажав по области вокруг попапа(карточек) // не совсем понимаю если "передавать данную константу в функцию закрытия. " то при клике даже НА САМ попап будет закрытие :(
function popupOverlayClickHandlerCards(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggleCards();
    }
}

// Закрыть нажав по области вокруг попапа(Изображения)   
function popupOverlayClickHandlerAp(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggleAp(popupAp);
    }
}

//открытие попапа приближения
function popupEnableToggleAp(popupAp) {
    popupAp.classList.add('popup_enable')
}

// закрытие попапа увеличения
function popupDisableToggleAp(popupAp) {
    popupAp.classList.remove('popup_enable');
}

//Функция создания карточки (после 1го ревью)
const createCard = (item) => {
    const elementCards = templateCards.cloneNode(true);
    elementCards.querySelector('.elements__element-image').src = item.link;
    elementCards.querySelector('.elements__element-image').alt = item.name;
    elementCards.querySelector('.elements__element-subtitle').textContent = item.name;
    elementCards.querySelector('.elements__element-like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__element-like_activated');
    })
    elementCards.querySelector('.elements__delete-button').addEventListener('click', function (event) {
        event.target.closest('.elements__element').remove();
    })
    elementCards.querySelector('.elements__element-image').addEventListener('click', function (event) {
        imagePopUpHandler(item);
    })
    return elementCards;
}

//Функция добавления карточки в контейнер (после 1го ревью)
const addCard = (item) => {
    cardsContainer.prepend(createCard(item));
}

//обработчик увеличивающего попапа (после 1го ревью)
function imagePopUpHandler(item) {
    popupImage.src = item.link;
    popupImage.alt = item.name;
    ImageTitle.textContent = item.name;
    popupEnableToggleAp(popupAp);
}

//Функция для изначальных карточек (после 1го ревью)
initialCards.forEach((item) => {
    addCard(item);
})

//Список нужных addEventListener вне функций (после 1го ревью)
const formSubmitHandlerCard = (event) => {
    event.preventDefault();
    addCard({
        name: name.value,
        link: link.value
    });
    popupDisableToggleCards();
    //не понимаю час пытался сделать reset и с value, и без, как только не пытался, искал инфу, но ничего не очищало, видимо что-то не понимаю :С
    name.value = "";
    link.value = "";
}
createToogle.addEventListener('submit', formSubmitHandlerCard)

openPopupButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    nameInput.value = nameOrigin.textContent;
    passionInput.value = passionOrigin.textContent;
    popupEnableToggle(popupProfile);
});
closePopupButton.addEventListener('click', () => popupDisableToggle(popupProfile));
popupProfile.addEventListener('click', popupOverlayClickHandler);
formElement.addEventListener('submit', popupProfileSaveButton);
addButton.addEventListener('click', () => popupEnableToggleCards(popupCards));
closePopupButtonCards.addEventListener('click', popupDisableToggleCards);
popupCards.addEventListener('click', popupOverlayClickHandlerCards);
closeAp.addEventListener('click', () => popupDisableToggleAp(popupAp));
popupAp.addEventListener('click', popupOverlayClickHandlerAp)