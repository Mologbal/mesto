import Popup from "./Popup.js";
export default class Card {
constructor(data, cardSelector, {
  handleCardClick,
  handleLikeClick,
  handleDeleteCardClick
 }) {
  this._link = data.link;
  this._name = data.name;
  this._cardSelector = cardSelector;
  this._handleCardClick = handleCardClick;
  this._handleLikeClick = handleLikeClick;
  this._handleDeleteCardClick = handleDeleteCardClick;

 }

 //клонирует карточку
 _getTemplate() {
  return document.querySelector('.template-cards').content.querySelector('.elements__element').cloneNode(true);
 }


 //наполнит карточку данными
 _renderCard() {
  this._element = this._getTemplate();
  this._elementButton = this._element.querySelector('.elements__delete-button');
  this._element.querySelector('.elements__element-subtitle').textContent = this._name; /*тянет в клон текст*/
  const elementImg = this._element.querySelector('.elements__element-image');

  elementImg.src = this._link; /*тянет в клон ссылку*/
  elementImg.alt = this._name;

  this._setCardEventListeners(this._element);

  return this._element;
 }

 //слушатели лайка удаления и приближения карточек
 _setCardEventListeners(element) {
  element.querySelector('.elements__delete-button').addEventListener('click', this._handleDelete.bind(this));
  element.querySelector('.elements__element-like').addEventListener('click', this._handleLike.bind(this));
  element.querySelector('.elements__element-image').addEventListener('click', () => {
   this._handleCardClick(this._name, this._link);
  });
 }
 
 //удаление карточки
 removeElement() {
  this._element.remove();
  this._element = null;
 }


 // удалит карточку
 _handleDelete() {
  this.removeElement(this);
 }

 //поставит лайк
 _handleLike(event) {
  event.target.classList.toggle('elements__element-like_activated') 
 }

 //вернет карточку
 generate() {
  return this._renderCard();
 }

}
