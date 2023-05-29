import Api from "./Api.js";
export default class Card {
    //принимает в себя два параметра
    constructor(templateSelector, data, handleCardClick, api, id,handleLike,submitOpen) {
        this._data = data;
        this.api= api;
        this._template = templateSelector;
        this._handleCardClick = handleCardClick;
        this.element = this._template.cloneNode(true).children[0];
        this.likeImage = this.element.querySelector('.elements__like')
        this.id = id;// айдишник работает
        this.likes= this._data.likes;
        this._deleteButton = this.element.querySelector('.elements__delete');
        this.owner = new Object(this._data.owner);
        this._ownerId= this.owner._id;
        this._cardId = this._data._id;
        this.handleLikeCard = handleLike;
        this.submitOpen = submitOpen;


        this._likesCounter = this.element.querySelector('.elements__like-counter');


        this._cardImage = this.element.querySelector(".elements__image");
    }

//метод навешивания лайка
    #toggleLike = () => {
        this.likeImage.classList.toggle("elements__like_active");
    }

//метод удаления карточки, нужна проверка на своя не своя
    #deleteCard = () => {
        this.api.deleteCard(this._data._id);
        this.element.remove();
        this.element = null;
    }


//Метод навешивания всех слушателей
    setEventListener() {
        //закрасить лайк
        this.element.querySelector(".elements__like").addEventListener("click", () => {
            //this.api.putLike(this._data._id);
            this.handleLikeCard(this);
            this.#toggleLike();
        });
        //просмотреть изображение полностью

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._data.name, this._data.link)
        });
        //функция удаления
        this.element.querySelector(".elements__delete").addEventListener("click",() =>{
            this.submitOpen()
            console.log(this.element)
        } );//this.#deleteCard

    }

//пересчитать лайки
    updateLikes = (item) => {
        if (item.likes === undefined){item.likes= 0;}//проверить это место

        this._likesCounter.textContent = item.likes.length;
    }
//Основной (публичный) метод создания карточки, в котором мы вызываем нужные методы и наполняем будущую карточку данными из формы.
    createCard = () => {
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;
        this.element.querySelector(".elements__text").textContent = this._data.name;
        if(this.likes === undefined){this.likes = [];}
        this.setEventListener();
        this._checkAbilityToDelete();
        this._updateLikesView();


        return this.element;
    }
    // Получение ID
    getCardId() {
        return this._cardId;
    };

    // Изменение состояния кнопки удаления карточки

  _checkAbilityToDelete() {
    if (this.id !== this._ownerId) {
      this._deleteButton.classList.add('elements__delete_disable');
    } else {
      this._deleteButton.classList.remove('elements__delete_disable');
    }
  };

    isLiked() {

            return Boolean (this.likes.find(userData => userData._id === this.id))
    };

    _updateLikesView() {
        if (this.isLiked()) {
          //  this._likeCounter.textContent = this._likes.length;
            this.likeImage.classList.add('elements__like_active');
        } else {
         //   this._likeCounter.textContent = this._likes.length;
            this.likeImage.classList.remove('elements__like_active');
        };
    };

    id() {
        return this._cardId;
      };
}
