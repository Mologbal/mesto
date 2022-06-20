//импорты
import './pages/index.css'
import
Card
from "./scripts/components/Card.js"
import {
  FormValidator
} from "./scripts/components/FormValidator.js"
import {
  obj
} from "./scripts/components/FormValidator.js"
import {
  initialCards
} from "./scripts/utils/data.js"
import
Section
from "./scripts/components/Section.js"
import PopupWithImage
from "./scripts/components/PopupWithImage.js"
import
PopupWithForm from "./scripts/components/PopupWithForm.js"
import
UserInfo from './scripts/components/UserInfo.js'
import {
  buttonOpenPopup,
  nameInput,
  passionInput,
  buttonAdd,
  toogleCreate,
  formElement,
  profileName,
  profileAbout
} from './scripts/utils/constants.js'


//попап просмотра карточек
const popupImg = new PopupWithImage('#popup-approximation');
popupImg.setEventListeners();

//отрисовка карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const insertCard = createCard(item);
    cardsList.addItem(insertCard);
  }
}, '.elements');
cardsList.initialItems();



//данные профиля юзера
const userInfo = new UserInfo({
  profileName: profileName,
  profileAbout: profileAbout
});


const place = document.querySelector('#place').value
const link = document.querySelector('#link').value

//добавление карточек в контейнер (Попап с карточками)
const popupAdd = new PopupWithForm('#popup-cards', (formData) => {
  const insertCard = createCard(place, link);
  cardsList.addItem(insertCard); //я просидев 2 дня по 12 часов так и не понял в чем беда карточек, почему они приходят пустые :( Нужен какой то толстый намёк, мне глупому.
  popupAdd.close();              // ради них переделывал весь проект 3 раза и не помогло, хоть плачь, все сроки проходят уже :(
});
popupAdd.setEventListeners();

buttonAdd.addEventListener('click', openAddCardForm);

function openAddCardForm() {
  popupAdd.open();
}



//добавление данных профиля (Попап профиля)
const popupEdit = new PopupWithForm('#popup-profile', ({
  name,
  about
}) => {
  userInfo.setUserInfo({
    name: nameInput.value,
    about: passionInput.value //просидел целый день, не понимаю почему у других студентов эта функция, как и та что выше не требует уточнений через : , а у меня работает только с уточнениями
  });
})
popupEdit.setEventListeners();

buttonOpenPopup.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name; //вставка с шапки в форму
  passionInput.value = userInfo.getUserInfo().about; //вставка с шапки в форму
  validationEditPopup.letscleanErrors(); //очистит поля сообщений ошибок, при повторном открытии попапа
  popupEdit.open();
});



//возвращаем карточки
function createCard(item) {
  const card = new Card(item, 'template-cards', {
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
