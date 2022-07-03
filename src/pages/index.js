//импорты
import './index.css'
import
Card
from "../components/Card.js"
import {
  FormValidator
} from "../components/FormValidator.js"
import {
  initialCards
} from "../utils/data.js"
import
Section
from "../components/Section.js"
import PopupWithImage
from "../components/PopupWithImage.js"
import
PopupWithForm from "../components/PopupWithForm.js"
import {
  buttonOpenPopup,
  nameInput,
  passionInput,
  buttonAdd,
  toogleCreate,
  formElement,
  profileName,
  profileAbout,
  obj,
  avatar,
  formAvatar,
  avatarButton,
  apiConfig
} from '../utils/constants.js'
import
Api from '../components/Api.js'
import
UserInfo from '../components/UserInfo.js'
import
PopupDelete from '../components/PopupDelete.js'

// API
const api = new Api(apiConfig)


//объединенный промис и для профиля и для карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userInfo.setUserInfo({
      name: data.name,
      about: data.about,
      avatar: data.avatar,
      _id: data._id
    });
    cardsList.initialItems(items);
  })
  .catch((err) => console.log(err))

//удаление карточки (попап удаления карточки)
const deleteCardPopup = new PopupDelete({
  popupSelector: '#popup-delete'
})
deleteCardPopup.setEventListeners()

//аватар пользователя
//добавление аватара (попап аватара)
const editAvatarPop = new PopupWithForm('#popup-avatar', {
  submitForm: (data) => {
    editAvatarPop.loading(true)
    api.editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data)
        editAvatarPop.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        editAvatarPop.loading(false)
      })
  }
})
editAvatarPop.setEventListeners();

avatarButton.addEventListener('click', openAvatarForm)

function openAvatarForm() {
  validationAvatarPopup.letsCleanErrors()
  editAvatarPop.open()
}

//попап просмотра карточек
const popupImg = new PopupWithImage('#popup-approximation');
popupImg.setEventListeners();

//отрисовка карточек
const cardsList = new Section({
  renderer: (item) => {
    const insertCard = createCard(item);
    cardsList.addItem(insertCard);
  }
}, '.elements');

//добавление карточек в контейнер (Попап с карточками)
const popupAdd = new PopupWithForm('#popup-cards', {
  submitForm: (data) => {
    popupAdd.loading(true)
    api.addCard(data)
      .then((data) => {
        cardsList.addItem(createCard(data));
        popupAdd.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        popupAdd.loading(false)
      })
  }
})
popupAdd.setEventListeners();

buttonAdd.addEventListener('click', openAddCardForm);

function openAddCardForm() {
  validationCardPopup.letsCleanErrors()
  popupAdd.open();
}

//данные профиля юзера
const userInfo = new UserInfo({
  profileName,
  profileAbout,
  avatar
});

//добавление данных профиля (Попап профиля)
const popupEdit = new PopupWithForm('#popup-profile', {
  submitForm: (data) => {
    popupEdit.loading(true)
    api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        popupEdit.loading(false)
      })
  }
})
popupEdit.setEventListeners();

buttonOpenPopup.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  passionInput.value = userInfo.getUserInfo().about;
  validationEditPopup.letsCleanErrors(); //очистит поля сообщений ошибок, при повторном открытии попапа
  popupEdit.open();
});

//возвращаем карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: '.template-cards',
    userId: userInfo._id,
    handleCardClick: (name, link) => {
      popupImg.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.deleteCallback(() => {
        deleteCardPopup.loading(true)
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            deleteCardPopup.loading(false)
          })
      });
    },
    setLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.checkLikeLength(data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    },
    removeLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.checkLikeLength(data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  })
  const cardElement = card.renderCard();
  return cardElement;
}

//!!Секция слушателей работающих с модулем 'FormValidator'!!
const validationEditPopup = new FormValidator(formElement, obj) //для попапа с профилем
validationEditPopup.enableValidation()

const validationCardPopup = new FormValidator(toogleCreate, obj) // для попапа с карточками
validationCardPopup.enableValidation()

const validationAvatarPopup = new FormValidator(formAvatar, obj) // для попапа с аватаром
validationAvatarPopup.enableValidation()