export default class Api {
    constructor(renderCard, profile, url, headers) {
        this.renderCard = renderCard;
        this.profile = profile;
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
    };

    //функция отрисовки стандартных карточек
    getCards() {
        return fetch(this._url + '/cards', {
            headers: this._headers
        }
        )
            .then(this._checkResponse)
            .then((posts) => {
                posts.forEach((post) => {
                    this.renderCard(post);
                });
            });
    }

    //функция получения и установки имени профиля
    getProfileInfo() {
        return fetch(this._url + '/users/me', {
            headers: this._headers
        })
            .then(this._checkResponse)
            .then((posts) => {
                this.profile.setUserInfo({name: posts.name, info: posts.about});
            });
    }

    //функция отправки имени на серв
    setName() {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: 'Marie Skłodowska Curie',
                about: 'Physicist and Chemist'
            })
        })
            .then(this._checkResponse);
    }

    //функция добавления новой карточки на серв
    newCard() {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: 'НеЯпония',
                link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
            })
        })
            .then(this._checkResponse);
    }

//функция удаления карточки по id
    deleteCard() {
        return fetch(this._url + '/cards/id', {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

//функция аватара отправки ссылки аватара
    setAvatar() {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: 'https://klike.net/uploads/posts/2022-06/1654842644_4.jpg'
            })
        })
            .then(this._checkResponse);
    }
}