// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
//пока профиль,потом можно поменять на просто форму popup__form
//const form = document.querySelector('.popup__form_profile');

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
function setEventListeners (formValidate, {inputSelector, submitButtonSelector, ...rest}) {
    //создаём массив из инпутов
    const formInputs = Array.from(formValidate.querySelectorAll(inputSelector));
    const formButton = formValidate.querySelector(submitButtonSelector);
    console.log(rest);
    disableButton(formButton, rest);
    //каждому инпуту добавляем слушатель
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input);
            //проверить есть ли хоть один незаполеный инпут
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton, rest);
            } else {
                enableButton(formButton, rest);
            }
        })
    })
}

function checkInputValidity (item) {
    //находим сообщение(span) об ошибке называть по принципу id инпута к которому он относится +"-error"
    const currentInputErrorConteiner = document.querySelector(`#${item.id}-error`);
    //checkValidity встроенный метод который возвращает тру или фолс основываясь на разметке
    if (item.checkValidity()) {
        currentInputErrorConteiner.textContent = "";
    } else {
        //выводим встроенное сообщение validationMessage
        currentInputErrorConteiner.textContent = item.validationMessage;
    }
}
//проверяем вернёт ли какой элемент то что он не заполнен
function hasInvalidInput (formInputs) {
    return formInputs.some(item => !item.validity.valid);
}

function enableButton (button, {inactiveButtonClass}) {
    button.classList.remove(inactiveButtonClass);
    button.classList.add("popup__submit_valid");
    button.removeAttribute('disabled' ,true);

}

function disableButton (button, {inactiveButtonClass}) {
    button.classList.remove("popup__submit_valid");
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled',true);
}

enableValidation(validationConfig);
// const formInputs = Array.from(form.querySelectorAll(".popup__input"));