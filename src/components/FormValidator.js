export class FormValidator {
    constructor(formElement, obj) {
        this._formselector = obj.formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass;
        this._errorText = obj.errorText;
        this._formElement = formElement;
        this._submitButtonElement = formElement.querySelector(obj.submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    }
    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListener();
    }

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }


    _hasInvalidInput = () => {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._submitButtonElement.classList.add(this._inactiveButtonClass);
            this._submitButtonElement.setAttribute('disabled', 'disabled');
        } else {
            this._submitButtonElement.classList.remove(this._inactiveButtonClass);
            this._submitButtonElement.removeAttribute('disabled', 'disabled');
        }
    }

    _setEventListener = () => {
        this._hasInvalidInput();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _showInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }

    letsCleanErrors = () => {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
        this._toggleButtonState();
    }
}