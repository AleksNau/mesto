class Api {
    constructor() {
    }

    //функция отрисовки стандартных карточек
getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
        headers: {
          authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba'
        }
      })
      .then(res => res.json())
      .then((posts) => {
        posts.forEach((post) => {
            renderCard(post);
        });
      });
  }

  //функция получения и установки имени профиля
getProfileInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
        headers: {
          authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba'
        }
      })
      .then(res => res.json())
      .then((posts) => {
        profile.setUserInfo({name:posts.name,info: posts.about});
      });
  }
  
  //функция отправки имени на серв
  setName() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Marie Skłodowska Curie',
    about: 'Physicist and Chemist'
  })
});
  }

  //функция добавления новой карточки на серв
 newCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
  method: 'POST',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'НеЯпония',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  })
});}

//функция удаления карточки по id
deleteCard() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards/id', {
  method: 'DELETE',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  }
});}

//функция аватара отправки ссылки аватара
setAvatar() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: '15d7e2e1-013e-46c1-bf6c-b7380245bfba',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: 'https://klike.net/uploads/posts/2022-06/1654842644_4.jpg'
  })
});}
}