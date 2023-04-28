
export default class FormValidator {
    //добавить в параметры конструктора объект с его параметрами
    constructor(formSelector, {...rest}) {
        this._form = document.querySelector(formSelector);
        this._rest = rest;
    }

    enableValidation = () => {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this.#setEventListeners(this._rest);
    }

    #hasInvalidInput(formInputs) {
        return formInputs.some(item => !item.validity.valid);
    }

    #setEventListeners({inputSelector, submitButtonSelector, inputErrorClass, ...rest}) {
        //создаём массив из инпутов
        const formInputs = Array.from(this._form.querySelectorAll(inputSelector));
        const formButton = this._form.querySelector(submitButtonSelector);
        this.disableButton(formButton, rest);
        //каждому инпуту добавляем слушатель
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.#checkInputValidity(input, inputErrorClass);
                //проверить есть ли хоть один незаполеный инпут
                if (this.#hasInvalidInput(formInputs)) {
                    this.disableButton(formButton, rest);
                } else {
                    this.enableButton(formButton, rest);
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

    disableButton(button, {inactiveButtonClass}) {
        button.classList.add(inactiveButtonClass);
        button.setAttribute('disabled', true);
    }
}

