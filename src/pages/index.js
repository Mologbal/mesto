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
import
UserInfo from '../components/UserInfo.js'
import {
  buttonOpenPopup,
  nameInput,
  passionInput,
  buttonAdd,
  toogleCreate,
  formElement,
  profileName,
  profileAbout,
  obj
} from '../utils/constants.js'


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
cardsList.initialItems(initialCards);








//добавление карточек в контейнер (Попап с карточками)
const popupAdd = new PopupWithForm('#popup-cards', {
  submitForm: (data) => {
    const item = {
      name: data.placeName,
      link: data.placeLink
    }
    const insertCard = createCard(item);
    cardsList.addItem(insertCard);
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
  profileAbout
});


//добавление данных профиля (Попап профиля)
const popupEdit = new PopupWithForm('#popup-profile', {
  submitForm: (data) => {
    userInfo.setUserInfo(
      data.name,
      data.passion
    )
  }
})
popupEdit.setEventListeners();

buttonOpenPopup.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name; //вставка с шапки в форму
  passionInput.value = userInfo.getUserInfo().about; //вставка с шапки в форму
  validationEditPopup.letsCleanErrors(); //очистит поля сообщений ошибок, при повторном открытии попапа
  popupEdit.open();
});



//возвращаем карточки
function createCard(item) {
  const card = new Card(item, '.template-cards', {
    handleCardClick: (name, link) => {
      popupImg.open(name, link);
    },
  });
  return card.generate();
}



//!!Секция слушателей работающих с модулем 'FormValidator'!!
const validationEditPopup = new FormValidator(formElement, obj) //для попапа с профилем
validationEditPopup.enableValidation()


const validationCardPopup = new FormValidator(toogleCreate, obj) // для попапа с карточками
validationCardPopup.enableValidation()