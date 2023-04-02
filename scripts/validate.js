//пока профиль,потом можно поменять на просто форму popup__form
const form = document.querySelector('.popup__form_profile');

const enableValidation = () => {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })

    setEventListeners(form);
}
//накладываем слушатели на форму
function setEventListeners (formValidate) {
    //создаём массив из инпутов
    const formInputs = Array.from(formValidate.querySelectorAll(".popup__input"));
    const formButton = formValidate.querySelector(".popup__submit");
    console.log(formButton);
    disableButton(formButton);
    //каждому инпуту добавляем слушатель
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input);
            //проверить есть ли хоть один незаполеный инпут
            if (hasInvalidInput(formInputs)) {
                disableButton(formButton);
            } else {
                enableButton(formButton);
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

function enableButton (button) {
    button.classList.remove("popup__submit_invalid");
    button.classList.add("popup__submit_valid");
    button.removeAttribute('disabled' ,true);

}

function disableButton (button) {
    button.classList.remove("popup__submit_valid");
    button.classList.add("popup__submit_invalid");
    button.setAttribute('disabled',true);
}

enableValidation();


// const formInputs = Array.from(form.querySelectorAll(".popup__input"));