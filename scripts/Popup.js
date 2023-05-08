const esc = 27;
export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.popups = document.querySelectorAll('.popup');
    }
//которые отвечают за открытие и закрытие попапа.
    open = () => {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup", this._handleEscClose);
        this.overlay();
    }

    close = () => {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup", this._handleEscClose);
    }

    _handleEscClose(event) {
//содержит логику закрытия попапа клавишей Esc.
        if (event.key === 'Escape') {
            this.closestOpenedPopup = document.querySelector('.popup_opened');
            this.closestOpenedPopup.classList.remove('popup_opened');
        }
    }

    overlay(){
        this.popups.forEach((popup) => {
            popup.addEventListener('mousedown', (evt) => {
                if (evt.target.classList.contains('popup_opened')) {
                    this.close();
                }
                if (evt.target.classList.contains('popup__close-button')) {
                    this.close();
                }
            })
        })
    }

    setEventListeners() {
//оторый добавляет слушатель клика иконке закрытия попапа
        this._button = this._popup.querySelector(".popup__close-button");
        this._button.addEventListener('click', () => this.close(this._popup));
    }
}