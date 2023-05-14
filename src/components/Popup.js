export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

//которые отвечают за открытие и закрытие попапа.
    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup", this._handleEscClose);
        this.overlay();
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

//содержит логику закрытия попапа клавишей Esc.
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.closestOpenedPopup = document.querySelector('.popup_opened');
            this.closestOpenedPopup.classList.remove('popup_opened');
        }
    }

    overlay() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        })
    }

//оторый добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close(this._popup));
    }
}