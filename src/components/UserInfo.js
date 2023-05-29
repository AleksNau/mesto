export default class UserInfo {

    constructor(profileName,profileInfo,profileAvatar) {
        this.profileElement = document.querySelector('.profile');
        this.profileName = this.profileElement.querySelector(profileName);
        this.profileInfo = this.profileElement.querySelector(profileInfo);
        this.profileAvatar = this.profileElement.querySelector(profileAvatar);

    }

// возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        return {name: this.profileName.textContent, about: this.profileInfo.textContent};
    }

//принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo(userData) {
        this.profileName.textContent = userData.name;
        this.profileInfo.textContent = userData.about;
    }

    setAvatar(data) {        
        this.profileAvatar.src = data.avatar;
    }

}