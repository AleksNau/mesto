export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector(".popup__close-button");
    }

//которые отвечают за открытие и закрытие попапа.
    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keyup",this._handleEscClose);

    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keyup",this._handleEscClose);
    }

//содержит логику закрытия попапа клавишей Esc.
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    clickByOverlay() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        })
    }

//оторый добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {

        this._buttonClose.addEventListener('click', () => this.close(this._popup));
        this.clickByOverlay();
    }
}