import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImg = this._popup.querySelector('.popup__image');
      this._popupImgSignature = this._popup.querySelector('.popup__image-title');
    }
  
    open (name, link) {
      this._popupImg.src = link; //устанавить ссылку
      this._popupImg.alt = name; //устанавить альт
      this._popupImgSignature.textContent = name; //установить подпись картинке
      super.open();
    }
  }