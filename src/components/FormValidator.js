// создаем класс для валидации форм
class FormValidator {
  constructor(
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
      buttonCloseSelector,
      popupSelector,
    }
  ) {
    this._form = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._buttonCloseSelector = buttonCloseSelector;
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._buttonClose = this._form.querySelector(this._buttonCloseSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._popup = this._form.closest(popupSelector);
  }
  // метод проверки валидности инпутов
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // показ ошибки
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  // скрытие ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  // метод вызов необходимого метода скрытия или показа ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  // метод переключения "доступности" кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    }
  }

  _submitForm() {
    this._toggleButtonState();
  }

  // метод удаления ошибок с инпутов формы редактирования
  _closeForm() {
    this._buttonClose.addEventListener('click', () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
      this._toggleButtonState();
    });
  }

  // метод для объявления слушателей события валидации формы
  _setEventListeners() {
    this._form.addEventListener('submit', () => this._submitForm());
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._closeForm();
  }

  // "публичный" метод активации валидации
  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
}

export { FormValidator };
