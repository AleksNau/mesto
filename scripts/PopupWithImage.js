import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super();
        this._popup = document.querySelector(popupSelector);
        this.popups = document.querySelectorAll('.popup');
        this.popupImage = document.querySelector(".popup_image-zoom");
        this.imageZoomed = this.popupImage.querySelector(".popup__image");
        this.imageText = this.popupImage.querySelector(".popup__place-name");
    }
    open = (name,link) => {
        this.imageText.textContent = name;//name
        this.imageZoomed.src = link;//устанавливаем ссылку
        this.imageZoomed.alt = name;//устанавливаем подпись картинке name
        this._popup.classList.add('popup_opened');
        this.overlay();
    }
}