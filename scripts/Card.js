export class Card {
  constructor(cardSelector, initialCards, imagePopUpHandler) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this.cardSelector = cardSelector;
    this.imagePopUpHandler = (cardsInformation) => {
      imagePopUpHandler(cardsInformation)
    }
  }
  _getTemplate() {
    const elementTemplate = document
      .querySelector('.template-cards')
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
    return elementTemplate;
  }
  generateCard(cardsInformation) {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.elements__element-image');
    this._elementSubtitle = this._element.querySelector('.elements__element-subtitle');
    this._elementDeleteButton = this._element.querySelector('.elements__delete-button');
    this._elementLikeButton = this._element.querySelector('.elements__element-like');

    this._elementImage.src = cardsInformation.link;
    this._elementSubtitle.textContent = cardsInformation.name;
    this._elementImage.alt = cardsInformation.name;

    this._elementDeleteButton.addEventListener('click', () => {
      this._handleDeleteCard()
    });
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeCard()
    });
    this._elementImage.addEventListener('click', () => {
      this.imagePopUpHandler(cardsInformation);
    })
    return this._element;
  }
  _handleDeleteCard() {
    this._element.remove();
    this._element = null //надеюсь я правильно понял совет, и "занулять" нужно после remove , а не вместо него.
  }
  _handleLikeCard() {
    this._elementLikeButton.classList.toggle('elements__element-like_activated');
  }
}