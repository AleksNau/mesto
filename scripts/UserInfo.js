export default class UserInfo {

    constructor(name,info) {
        this._name = name;
        this._info = info;
        this.profileElement= document.querySelector('.profile');
        this.profileName = this.profileElement.querySelector('.profile__name');
        this.profileInfo = this.profileElement.querySelector('.profile__info');
    }
// возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return {name :this._name,info: this._info};
    }

//принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo() {
        this.profileName.textContent = this._name;
        this.profileInfo.textContent = this._info;
    }
}