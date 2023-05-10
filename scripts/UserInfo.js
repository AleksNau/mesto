export default class UserInfo {

    constructor(name,info) {
        this._name = name;
        this._info = info;
        this.profileElement = document.querySelector('.profile');
        this.profileName = this.profileElement.querySelector('.profile__name');
        this.profileInfo = this.profileElement.querySelector('.profile__info');
        this.popupProfile = document.querySelector('.popup_profile');
        this.popupName = this.popupProfile.querySelector('.popup__input_type_name');
        this.popupinfo = this.popupProfile.querySelector('.popup__input_type_info');
    }

// возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return {name: this.profileName.textContent, info: this.profileInfo.textContent};
    }

//принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo() {
        this.profileName.textContent = this._name;
        this.profileInfo.textContent = this._info;
    }

    setPopupInfo(item) {
       this.popupName.value = item.name;
        this.popupinfo.value = item.info;
    }
}