//Массив с изначальными карточками
const initialCards = [{
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


//переменные которые используются в проекте
const popup = document.querySelector('.popup');
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

//Открыть попап
function popupEnableToggle() {
    popup.classList.add('popup_enable');
    nameInput.value = nameOrigin.textContent
    passionInput.value = passionOrigin.textContent;
}

//Закрыть попап
function popupDisableToggle() {
    popup.classList.remove('popup_enable');
}

// Закрыть нажав по области вокруг попапа
function popupOverlayClickHandler(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggle();
    }
}

//Кнопка сохранить
function submitToogle(event) {
    event.preventDefault();
    nameOrigin.textContent = nameInput.value;
    passionOrigin.textContent = passionInput.value;
    popupDisableToggle();
}

//Открыть попап(карточки)
function popupEnableToggleCards() {
    popupCards.classList.add('popup_enable');
    nameInput.value = nameOrigin.textContent
    passionInput.value = passionOrigin.textContent;
}

//закрыть попап (карточки)
function popupDisableToggleCards() {
    popupCards.classList.remove('popup_enable');
}


// Закрыть нажав по области вокруг попапа(карточек)
function popupOverlayClickHandlerCards(evt) {
    if (evt.target === evt.currentTarget) {
        popupDisableToggleCards();
    }
}

//открытие попапа приближения
function popupEnableToggleAp() {
    popupAp.classList.add('popup_enable')
}

// закрытие попапа увеличения
function popupDisableToggleAp() {
    popupAp.classList.remove('popup_enable');
}


//Функция для добавления новых карточке пользователем
function addCards(nameValue, linkValue) {
    const elementCards = templateCards.cloneNode(true);
    elementCards.querySelector('.elements__element-image').src = linkValue;
    elementCards.querySelector('.elements__element-subtitle').textContent = nameValue;
    elementCards.querySelector('.elements__element-like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__element-like_activated')
    })
    elementCards.querySelector('.elements__delete-button').addEventListener('click', function (event) {
        event.target.closest('.elements__element').remove()
    })
    elementCards.querySelector('.elements__element-image').addEventListener('click', function (event) {
        imagePopUpHandler(item)
        return elementCards;
    })
    cardsContainer.prepend(elementCards);
}


//обработчик увеличивающего попапа
function imagePopUpHandler(item) {
    popupImage.src = item.link;
    ImageTitle.textContent = item.name;
    popupEnableToggleAp();
}




//Функция для изначальных карточек
initialCards.forEach(function (item) {
    const elementCards = templateCards.cloneNode(true);
    elementCards.querySelector('.elements__element-subtitle').textContent = item.name;
    elementCards.querySelector('.elements__element-image').src = item.link;
    elementCards.querySelector('.elements__element-like').addEventListener('click', function (event) {
        event.target.classList.toggle('elements__element-like_activated')
    })
    elementCards.querySelector('.elements__delete-button').addEventListener('click', function (event) {
        event.target.closest('.elements__element').remove()
    })
    elementCards.querySelector('.elements__element-image').addEventListener('click', function (event) {
        imagePopUpHandler(item)
        return elementCards;
    })
    cardsContainer.prepend(elementCards);
})

//Список нужных addEventListener вне функций
createToogle.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = document.querySelector('#popup-cards-name');
    const link = document.querySelector('#popup-cards-link');
    addCards(name.value, link.value)
    name.value = "";
    link.value = "";
    popupDisableToggleCards()
})

openPopupButton.addEventListener('click', popupEnableToggle);
closePopupButton.addEventListener('click', popupDisableToggle);
popup.addEventListener('click', popupOverlayClickHandler);
formElement.addEventListener('submit', submitToogle);
addButton.addEventListener('click', popupEnableToggleCards);
closePopupButtonCards.addEventListener('click', popupDisableToggleCards)
popupCards.addEventListener('click', popupOverlayClickHandlerCards)
closeAp.addEventListener('click', popupDisableToggleAp)