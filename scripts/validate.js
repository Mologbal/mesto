//функция для проверки валидности данных
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

// спрятать ошибку 
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

// обработчик для функции ниже (toggleButtonState)
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//функция определяющая делать кнопки активными или отключать их
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__submit_inactive');
    } else {
        buttonElement.classList.remove('form__submit_inactive');
    }
};

//Функция добавляющая слушатели всем нужным переменным для валидации
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(`.popup__placeholder-input`));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

//обработка всех форм с классом 
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__placeholder'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

// Вызов валидации
enableValidation();