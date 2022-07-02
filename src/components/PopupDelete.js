import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__placeholder');
    this._button = this._popup.querySelector('.popup__save-button')
    this._buttonText = this._button.textContent
  }

  // к-бек для удаления карточки (используется в createCard)
  deleteCallback(data) {
    this._handleSubmit = data;
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('click', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }

  loading(isLoading) {
    if (isLoading) {
        this._button.textContent = 'Удаление...'
    }
    else {
        this._button.textContent = this._buttonText;
    }
}
}