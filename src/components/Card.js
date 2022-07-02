export default class Card {
  constructor({
    data,
    cardSelector,
    handleCardClick,
    handleDeleteIconClick,
    userId,
    setLike,
    removeLike
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick; //к-бек приближающий карточку
    this._handleDeleteIconClick = handleDeleteIconClick; //к-бек удаляющий карточку
    this._userId = userId;

    this._likes = data.likes;

    this._setLike = setLike;
    this._removeLike = removeLike;
  }

  //клонирует карточку
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.elements__element').cloneNode(true);
  }

  //удаление карточки (понадобится в createCard)
  deleteCard() {
    this._element.remove();
    this._element = null;
  }


  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
    this._deleteBtn.addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    })
    this._likeToogle.addEventListener('click', () => {
      if (this._likeToogle.classList.contains('elements__element-like_activated')) {
        this._removeLike(this._cardId);
      } else {
        this._setLike(this._cardId)
      }
    })
  }

  //наполнит карточку данными
  renderCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.elements__element-image');
    this._deleteBtn = this._element.querySelector('.elements__delete-button');
    this._likeToogle = this._element.querySelector('.elements__element-like');

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.elements__element-subtitle').textContent = this._name;
    this._letsCheckLiked()
    this._hasDeleteBtn();
    this._setEventListeners();

    this._likesNumber = this._element.querySelector('.elements__element-like-length')
    this._likesNumber.textContent = this._likes.length; // отрисует актуальное кол-во лайков

    return this._element;
  }


  // проверит можно ли удалять пользователю эту карточку
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }

  //проверит был ли лайк от юзера на этой карточке до этого
  _letsCheckLiked() {
    if (this._likes.some((user) => {
        return this._userId === user._id
      })) {
      this._likeToogle.classList.add('elements__element-like_activated')
    }
  }

  //переключатель лайка и подсчёт их количества
  checkLikeLength(data) {
    this._likes = data.likes
    this._likesNumber.textContent = this._likes.length
    this._likeToogle.classList.toggle('elements__element-like_activated')
  }
}