export default class Card {
  constructor({ ...props }) {
    this._cardSelector = props.cardSelector;
    this._name = props.data.name;
    this._link = props.data.link;
    this._id = props.data._id;
    this._altText =
      props.data.altText ||
      'Изображение новой карточки с произвольным изображением';
    this._likes = props.data.likes || [];
    this._ownerId = props.data.owner._id;
    this._myId = props.myId;
    this._handleCardClick = props.handleCardClick;
    this._handlePopupDelete = props.handlePopupDelete;
    this._handleCardLike = props.handleCardLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _getElements() {
    this._cardLike = this._element.querySelector('.element__btn-like');
    this._cardTrash = this._element.querySelector('.element__btn-trash');
    this._cardImg = this._element.querySelector('.element__img');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardLikes = this._element.querySelector('.element__likes');
  }

  _likeCard() {
    if (!this._cardLike.classList.contains('btn_type_like')) {
      this._cardLike.classList.add('btn_type_like');
      this._handleCardLike({ method: 'PUT', idCard: this._id })
        .then((likes) => (this._cardLikes.textContent = likes.length))
        .catch((err) => console.log(err));
    } else {
      this._cardLike.classList.remove('btn_type_like');
      this._handleCardLike({
        method: 'DELETE',
        idCard: this._id,
      })
        .then((likes) => (this._cardLikes.textContent = likes.length))
        .catch((err) => console.log(err));
    }
  }

  _setMyLike() {
    this._likes.find((like) => like._id === this._myId)
      ? this._cardLike.classList.add('btn_type_like')
      : null;
  }

  _trashElement() {
    this._element.remove();
    this._element = null;
  }

  _openPreview() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this._likeCard());
    this._cardImg.addEventListener('click', () => this._openPreview());
    if (this._myId !== this._ownerId) {
      this._cardTrash.remove();
    } else {
      this._cardTrash.addEventListener('click', () => {
        this._handlePopupDelete({
          deleteCard: this._trashElement.bind(this),
          id: this._id,
        });
      });
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._getElements();
    this._setEventListeners();
    this._element.id = this._id;
    this._setMyLike();
    this._cardTitle.textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._altText;
    this._cardLikes.textContent = this._likes.length;
    return this._element;
  }
}
