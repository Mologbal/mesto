//массив с настройками для enableValidation
const validationConfig = {
    formSelector: ".popup__placeholder",
    inputSelector: ".popup__placeholder-input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    errorText: ".popup__error"
};

//Функция добавляющая слушатели всем нужным переменным для валидации
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

//обработка всех форм с классом 
function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
    });
};

// обработчик для функции ниже (toggleButtonState)
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//функция определяющая делать кнопки активными или отключать их
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
    }
};

//показать ошибку
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

// спрятать ошибку 
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

//функция для проверки валидности данных
const isValid = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

const letscleanErrors = (validationConfig) => {
    const inputList = Array.from(document.querySelectorAll(validationConfig.errorText));
    inputList.forEach((inputElement) => {
        inputElement.textContent = ''
    }
    )
}
// Вызов валидации
enableValidation(validationConfig);