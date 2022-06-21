export default class Card {
constructor(data, cardSelector, {
  handleCardClick,
  handleLikeClick,
  handleDeleteCardClick
 }) {
  this._link = data.link;
  this._name = data.name;
  this._cardSelector = cardSelector
  this._handleCardClick = handleCardClick;
  this._handleLikeClick = handleLikeClick;
  this._handleDeleteCardClick = handleDeleteCardClick;

 }

 //клонирует карточку
 _getTemplate() {
  return document.querySelector(this._cardSelector).content.querySelector('.elements__element').cloneNode(true);
 }


 //наполнит карточку данными
 _renderCard() {
  this._element = this._getTemplate();
  this._elementButton = this._element.querySelector('.elements__delete-button');
  this._element.querySelector('.elements__element-subtitle').textContent = this._name; /*тянет в клон текст*/
  this._image = this._element.querySelector('.elements__element-image');
  this._likeButtton = this._element.querySelector('.elements__element-like');

  this._image.src = this._link; /*тянет в клон ссылку*/
  this._image.alt = this._name;

  this._setCardEventListeners(this._element);

  return this._element;
 }

 //слушатели лайка удаления и приближения карточек
 _setCardEventListeners() {
  this._elementButton.addEventListener('click', this._handleDelete.bind(this));
  this._element.querySelector('.elements__element-like').addEventListener('click', this._handleLike.bind(this));
  this._image.addEventListener('click', () => {
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
 _handleLike() {
  this._likeButtton.classList.toggle('elements__element-like_activated');
 }

 //вернет карточку
 generate() {
  return this._renderCard();
 }

}
