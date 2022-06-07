export class Card {
  constructor(initialCards, cardSelector, imagePopupHandler) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
    this._imagePopupHandler = () => imagePopupHandler(this._name, this._link);
  }
  _getTemplate() {
    const elementTemplate = document
      .querySelector('.template-cards')
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return elementTemplate;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__element-image');
    this._elementSubtitle = this._element.querySelector('.elements__element-subtitle');
    this._elementDeleteButton = this._element.querySelector('.elements__delete-button');
    this._elementLikeButton = this._element.querySelector('.elements__element-like');

    this._elementImage.src = this._link;
    this._elementSubtitle.textContent = this._name;
    this._elementImage.alt = this._name;

    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard()
    });
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeCard()
    });
    this._elementImage.addEventListener('click', () => {
      this._imagePopupHandler();
    })
    return this._element;
  }
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
  _handleLikeCard() {
    this._elementLikeButton.classList.toggle('elements__element-like_activated');
  }
}