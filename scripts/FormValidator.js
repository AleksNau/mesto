
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

        this.#setEventListeners(this._config);
    }

    #hasInvalidInput(formInputs) {
        return formInputs.some(item => !item.validity.valid);
    }

    #setEventListeners({inputErrorClass, ...rest}) {
        this.disableButton(this._submitButton, rest);
        //каждому инпуту добавляем слушатель
        this.inputList.forEach(input => {
            input.addEventListener('input', () => {
                this.#checkInputValidity(input, inputErrorClass);
                //проверить есть ли хоть один незаполеный инпут
                if (this.#hasInvalidInput(this.inputList)) {
                    this.disableButton(this._submitButton, rest);
                } else {
                    this.enableButton(this._submitButton, rest);
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

    enableButton(button, {inactiveButtonClass}) {
        button.classList.remove(inactiveButtonClass);
        button.removeAttribute('disabled', true);
    }

    disableButton() {
        this._submitButton.classList.add(this._config.inactiveButtonClass);
        this._submitButton.setAttribute('disabled', true);
    }
}

