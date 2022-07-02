import Popup from '../components/Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popup.querySelector('.popup__placeholder');
        this._inputList = this._popup.querySelectorAll('.popup__placeholder-input');
        this._button = this._popup.querySelector('.popup__save-button')
        this._buttonText = this._button.textContent
    }

    //соберёт данные с полей формы.
    _getInputValues() {
        this._formValues = {}
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        })
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    loading(isLoading) {
        if (isLoading) {
            this._button.textContent = 'Сохранение...'
        }
        else {
            this._button.textContent = this._buttonText;
        }
    }
}