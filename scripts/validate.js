// включение валидации вызовом enableValidation

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__input_type_error'
};

const enableValidation = ({formSelector, ...rest}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(form, rest);
    })
}

//накладываем слушатели на форму
function setEventListeners (formValidate, {inputSelector, submitButtonSelector,inputErrorClass, ...rest}) {
    //создаём массив из инпутов
    const formInputs = Array.from(formValidate.querySelectorAll(inputSelector));
    const formButton = formValidate.querySelector(submitButtonSelector);
    disableButton(formButton, rest);
    //каждому инпуту добавляем слушатель
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input, inputErrorClass);
            //проверить есть ли хоть один незаполеный инпут
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton, rest);
            } else {
                enableButton(formButton, rest);
            }
        })
    })
}

function checkInputValidity (item, errorClass) {
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
//проверяем вернёт ли какой элемент то что он не заполнен
function hasInvalidInput (formInputs) {
    return formInputs.some(item => !item.validity.valid);
}

function enableButton (button, {inactiveButtonClass}) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled' ,true);
}

function disableButton (button, {inactiveButtonClass}) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled',true);
}

enableValidation(validationConfig);