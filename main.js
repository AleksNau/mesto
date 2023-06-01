(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_invalid",inputErrorClass:"popup__input_type_error"};function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,o(r.key),r)}}function r(e,t){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.add(e)}function o(e){var n=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(n)?n:String(n)}function i(e,t,n){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return n}var u=new WeakSet,a=new WeakSet,c=new WeakSet,l=function(){function e(t,n){var l,s,p,y=this,d=Object.assign({},(function(e){if(null==e)throw new TypeError("Cannot destructure "+e)}(n),n));!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,c),r(this,a),r(this,u),l=this,p=function(){y._form.addEventListener("submit",(function(e){e.preventDefault()})),i(y,a,f).call(y)},(s=o(s="enableValidation"))in l?Object.defineProperty(l,s,{value:p,enumerable:!0,configurable:!0,writable:!0}):l[s]=p,this._form=t,this._config=d,this.inputList=Array.from(this._form.querySelectorAll(this._config.inputSelector)),this._submitButton=this._form.querySelector(this._config.submitButtonSelector)}var t,l;return t=e,(l=[{key:"enableButton",value:function(){this._submitButton.classList.remove(this._config.inactiveButtonClass),this._submitButton.removeAttribute("disabled",!0)}},{key:"disableButton",value:function(){this._submitButton.classList.add(this._config.inactiveButtonClass),this._submitButton.setAttribute("disabled",!0)}}])&&n(t.prototype,l),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(){return this.inputList.some((function(e){return!e.validity.valid}))}function f(){var e=this;this.disableButton(),this.inputList.forEach((function(t){t.addEventListener("input",(function(){i(e,c,p).call(e,t),i(e,u,s).call(e)?e.disableButton():e.enableButton()}))}))}function p(e){var t=document.querySelector("#".concat(e.id,"-error"));e.checkValidity()?(t.textContent="",e.classList.remove(this._config.inputErrorClass)):(t.textContent=e.validationMessage,e.classList.add(this._config.inputErrorClass))}function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,m(r.key),r)}}function h(e,t,n){return(t=m(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){var t=function(e,t){if("object"!==y(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==y(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===y(t)?t:String(t)}var b=function(){function e(t,n,r,o,i,u,a){var c=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),h(this,"toggleLike",(function(){c.likeImage.classList.toggle("elements__like_active")})),h(this,"updateLikes",(function(e){c.likes=e.likes,c._likesCounter.textContent=c.likes.length})),h(this,"createCard",(function(){return c._cardImage.src=c._data.link,c._cardImage.alt=c._data.name,c.element.querySelector(".elements__text").textContent=c._data.name,c.setEventListener(),c._checkAbilityToDelete(),c._updateLikesView(),c.element})),this._data=n,this.api=o,this._template=t,this._handleCardClick=r,this.element=this._template.cloneNode(!0).children[0],this.likeImage=this.element.querySelector(".elements__like"),this.id=i,this.likes=this._data.likes,this._deleteButton=this.element.querySelector(".elements__delete"),this.owner=new Object(this._data.owner),this._ownerId=this.owner._id,this._cardId=this._data._id,this.handleLikeCard=u,this.submitOpen=a,this._likesCounter=this.element.querySelector(".elements__like-counter"),this._cardImage=this.element.querySelector(".elements__image")}var t,n;return t=e,(n=[{key:"setEventListener",value:function(){var e=this;this.element.querySelector(".elements__like").addEventListener("click",(function(){e.handleLikeCard(e)})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._data.name,e._data.link)})),this.element.querySelector(".elements__delete").addEventListener("click",(function(){e.submitOpen(e,e._cardId)}))}},{key:"getCardId",value:function(){return this._cardId}},{key:"_checkAbilityToDelete",value:function(){this.id!==this._ownerId&&void 0!==this._ownerId?this._deleteButton.classList.add("elements__delete_disable"):this._deleteButton.classList.remove("elements__delete_disable")}},{key:"isLiked",value:function(){var e=this;return Boolean(this.likes.find((function(t){return t._id===e.id})))}},{key:"_updateLikesView",value:function(){this.isLiked()?this.likeImage.classList.add("elements__like_active"):this.likeImage.classList.remove("elements__like_active")}},{key:"id",value:function(){return this._cardId}},{key:"deleteCard",value:function(){this.element.remove(),this.element=null}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==v(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==v(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===v(o)?o:String(o)),r)}var o}var g=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.profileElement=document.querySelector(".profile"),this.profileName=this.profileElement.querySelector(t),this.profileInfo=this.profileElement.querySelector(n),this.profileAvatar=this.profileElement.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this.profileName.textContent,about:this.profileInfo.textContent}}},{key:"setUserInfo",value:function(e){this.profileName.textContent=e.name,this.profileInfo.textContent=e.about}},{key:"setAvatar",value:function(e){this.profileAvatar.src=e.avatar}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,k(r.key),r)}}function k(e){var t=function(e,t){if("object"!==w(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===w(t)?t:String(t)}var O=function(){function e(t){var n,r,o,i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,o=function(e){"Escape"===e.key&&i.close()},(r=k(r="_handleEscClose"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,this._popup=document.querySelector(t),this._buttonClose=this._popup.querySelector(".popup__close-button")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose)}},{key:"clickByOverlay",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close()}))}},{key:"setEventListeners",value:function(){var e=this;this._buttonClose.addEventListener("click",(function(){return e.close(e._popup)})),this.clickByOverlay()}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,T(r.key),r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=I(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function L(e,t){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},L(e,t)}function C(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e){return I=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},I(e)}function T(e){var t=function(e,t){if("object"!==j(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===j(t)?t:String(t)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&L(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=I(r);if(o){var n=I(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===j(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return C(e)}(this,e)});function u(e,t){var n,r,o,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),r=C(n=i.call(this,e)),a=function(e){n.renderLoading("Сохранение..."),e.preventDefault(),n._submit(n._getInputValues())},(o=T(o="submitForm"))in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a,n._submit=t,n._form=n._popup.querySelector(".popup__form"),n._submitButton=n._form.querySelector(".popup__submit"),n.open=n.open.bind(C(n)),n}return t=u,n=[{key:"_getInputValues",value:function(){return this._data=Object.fromEntries(new FormData(this._form)),this._data}},{key:"setEventListeners",value:function(){var e=this;E(I(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){e.submitForm(t)}))}},{key:"close",value:function(){E(I(u.prototype),"close",this).call(this),this._form.reset()}},{key:"renderLoading",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Сохранить";this._submitButton.textContent=e}}],n&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(O);function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==q(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}var x=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=t,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function A(e){return A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},A(e)}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==A(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==A(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===A(o)?o:String(o)),r)}var o}function N(){return N="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=U(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},N.apply(this,arguments)}function V(e,t){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},V(e,t)}function U(e){return U=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},U(e)}var z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&V(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=U(r);if(o){var n=U(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===A(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e)).popupImage=document.querySelector(".popup_image-zoom"),t.imageZoomed=t.popupImage.querySelector(".popup__image"),t.imageText=t.popupImage.querySelector(".popup__place-name"),t}return t=u,(n=[{key:"open",value:function(e,t){N(U(u.prototype),"open",this).call(this),this.imageText.textContent=e,this.imageZoomed.src=t,this.imageZoomed.alt=e}}])&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(O);function F(e){return F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},F(e)}function J(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,$(r.key),r)}}function W(){return W="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=M(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},W.apply(this,arguments)}function Z(e,t){return Z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},Z(e,t)}function H(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(e)}function $(e){var t=function(e,t){if("object"!==F(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==F(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===F(t)?t:String(t)}var G=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Z(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=M(r);if(o){var n=M(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===F(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return H(e)}(this,e)});function u(e,t){var n,r,o,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),r=H(n=i.call(this,e,t)),a=function(e){e.preventDefault(),n.renderLoading("Сохранение..."),n._submit(n.card,n.delId)},(o=$(o="submitForm"))in r?Object.defineProperty(r,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[o]=a,n.open=n.open.bind(H(n)),n}return t=u,n=[{key:"open",value:function(e,t){W(M(u.prototype),"open",this).call(this),this.card=e,this.delId=t}},{key:"renderLoading",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Да";this._submitButton.textContent=e}}],n&&J(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(R);function K(e){return K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K(e)}function Q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==K(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==K(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===K(o)?o:String(o)),r)}var o}var X=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=t,this._headers=n}var t,n;return t=e,n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getCards",value:function(){return fetch(this._url+"/cards",{headers:this._headers}).then(this._checkResponse)}},{key:"getProfileInfo",value:function(){return fetch(this._url+"/users/me",{headers:this._headers}).then(this._checkResponse)}},{key:"setName",value:function(e){return fetch(this._url+"/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.Name,about:e.Info})}).then(this._checkResponse)}},{key:"newCard",value:function(e,t){return fetch(this._url+"/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch(this._url+"/cards/".concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"sendAvatar",value:function(e){return fetch(this._url+"/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}},{key:"putLike",value:function(e){return fetch(this._url+"/cards/likes/".concat(e),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch(this._url+"/cards/likes/".concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}],n&&Q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function Y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ee=document.querySelector(".profile"),te=ee.querySelector(".profile__edit-button"),ne=ee.querySelector(".profile__avatar-button"),re=document.querySelector(".popup_profile"),oe=re.querySelector(".popup__form_profile"),ie=re.querySelector(".popup__input_type_name"),ue=re.querySelector(".popup__input_type_info"),ae=document.querySelector(".popup_add").querySelector(".popup__form_add"),ce=ee.querySelector(".profile__add-button");new l(document.querySelector(".popup_avatar").querySelector(".popup__form_avatar"),e).enableValidation();var le=document.querySelector(".template-item").content,se=new g(".profile__name",".profile__info",".profile__avatar");new l(oe,e).enableValidation();var fe=new l(ae,e);fe.enableValidation();var pe=function(e){var t,n,r=((n=new b(le,t=e,we,_e,ve,ge,de.open)).updateLikes(t),n.createCard());Se.addItem(r)},ye=new R(".popup_profile",(function(e){_e.setName(e).then((function(e){se.setUserInfo({name:e.name,about:e.about}),ye.close()})).catch((function(e){console.log(e)})).finally((function(){ye.renderLoading()}))}));ye.setEventListeners();var de=new G(".popup_remove",(function(e,t){_e.deleteCard(t).then((function(){e.deleteCard(),de.close()})).catch((function(e){console.log(e)})).finally((function(){de.renderLoading()}))}));de.setEventListeners();var he=new R(".popup_add",(function(e){_e.newCard(e.name,e.link).then((function(e){pe(e),he.close()})).catch((function(e){console.log(e)})).finally((function(){he.renderLoading()})),fe.disableButton()}));he.setEventListeners();var me=new z(".popup_image-zoom");me.setEventListeners(),ce.addEventListener("click",he.open);var be=new R(".popup_avatar",(function(e){_e.sendAvatar(e.link).then((function(e){se.setAvatar(e),be.close()})).catch((function(e){console.log(e)})).finally((function(){be.renderLoading()}))}));be.setEventListeners(),ne.addEventListener("click",be.open);var ve=null,_e=new X("https://mesto.nomoreparties.co/v1/cohort-66",{authorization:"15d7e2e1-013e-46c1-bf6c-b7380245bfba","Content-Type":"application/json"}),ge=function(e){e.isLiked()?_e.deleteLike(e.getCardId()).then((function(t){e.updateLikes(t)})).then((function(){e.toggleLike()})).catch((function(e){console.log(e)})):_e.putLike(e.getCardId()).then((function(t){e.updateLikes(t)})).then((function(){e.toggleLike()})).catch((function(e){console.log(e)}))};function we(e,t){me.open(e,t)}var Se=new x(pe,".elements");te.addEventListener("click",(function(){var e=se.getUserInfo();ie.value=e.name,ue.value=e.about,ye.open()})),Promise.all([_e.getProfileInfo(),_e.getCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==t);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return Y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];se.setUserInfo(o),se.setAvatar(o),ve=o._id,Se.renderItems(i.reverse())})).catch((function(e){console.log(e)}))})();