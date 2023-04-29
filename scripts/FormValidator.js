
export default class FormValidator {

    //добавить в параметры конструктора объект с его параметрами
    constructor(formSelector, {...rest}) {
        this._form = formSelector;
        this._config = rest;
        //создаём массив из инпутов
        this.inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);

    }

    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this.#setEventListeners();
    }

    #hasInvalidInput(formInputs) {
        return formInputs.some(item => !item.validity.valid);
    }

    #setEventListeners() {
        this.disableButton();
        //каждому инпуту добавляем слушатель
        this.inputList.forEach(input => {
            input.addEventListener('input', () => {
                this.#checkInputValidity(input, this._config.inputErrorClass);
                //проверить есть ли хоть один незаполеный инпут
                if (this.#hasInvalidInput(this.inputList)) {
                    this.disableButton();
                } else {
                    this.enableButton();
                }
            })
        })
    }

    #checkInputValidity(item, errorClass) {
        //находим сообщение(span) об ошибке называть по принципу id инпута к которому он относится +"-error"
        const currentInputErrorConteiner = document.querySelector(`#${item.id}-error`);
        //checkValidity встроенный метод который возвращает тру или фолс основываясь на разметке
        if (item.checkValidity()) {
            currentInputErrorConteiner.textContent = "";
            item.classList.remove(errorClass);
        } else {
            //выводим встроенное сообщение validationMessage
            currentInputErrorConteiner.textContent = item.validationMessage;
            item.classList.add(errorClass);
        }
    }

    enableButton() {
        this._submitButton.classList.remove(this._config.inactiveButtonClass);
        this._submitButton.removeAttribute('disabled', true);
    }

    disableButton() {
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true);
    }
}

