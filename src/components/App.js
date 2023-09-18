import React, { useState } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfileOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        name="avatarPopup"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          name="avatar"
          id="avatar"
          className="popup__input"
          placeholder="Название"
          required=""
        />
        <span className="popup__input-error popup__input-error_avatar" />
      </PopupWithForm>
      <PopupWithForm
        name="editProfile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          minLength={2}
          maxLength={40}
          type="text"
          name="username"
          className="popup__input"
          id="name"
          placeholder="Модель фотоаппарата"
          required=""
        />
        <span className="popup__input-error popup__input-error_username" />
        <input
          minLength={2}
          maxLength={200}
          type="text"
          name="user-description"
          className="popup__input"
          placeholder="Название фотоальбома"
          id="description"
          required=""
        />
        <span className="popup__input-error popup__input-error_user-description" />
      </PopupWithForm>
      <PopupWithForm
        name="cardPopup"
        title="Новая карточка"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          minLength={2}
          maxLength={30}
          type="text"
          name="card-name"
          id="title"
          className="popup__input"
          placeholder="Название"
          required=""
        />
        <span className="popup__input-error popup__input-error_card-name" />
        <input
          type="url"
          name="card-link"
          id="url"
          className="popup__input"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__input-error popup__input-error_card-link" />
      </PopupWithForm>
      <ImagePopup
        name="imagePopup"
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name="confirmPopup"
        title="Вы уверены?"
        onClose={closeAllPopups}
      ></PopupWithForm>
      {/* <section name="editProfile" className="popup">
          <div className="popup__container">
            <button type="button" className="popup__close-button" />
            <form noValidate="" name="editProfileForm" className="popup__form">
              <h2 className="popup__title">Редактировать профиль</h2>

              <button
                type="submit"
                className="popup__submit-button popup__submit-button_disabled"
              >
                Сохранить
              </button>
            </form>
          </div>
        </section> */}
      {/* <section name="cardPopup" className="popup">
          <div className="popup__container">
            <button type="button" className="popup__close-button" />
            <form
              noValidate=""
              name="addCardForm"
              className="popup__form"
              id="cardPopup"
            >
              <h2 className="popup__title">Новая фотокарточка</h2>
              <input
                minLength={2}
                maxLength={30}
                type="text"
                name="card-name"
                id="title"
                className="popup__input"
                placeholder="Название"
                required=""
              />
              <span className="popup__input-error popup__input-error_card-name" />
              <input
                type="url"
                name="card-link"
                id="url"
                className="popup__input"
                placeholder="Ссылка на картинку"
                required=""
              />
              <span className="popup__input-error popup__input-error_card-link" />
              <button
                type="submit"
                className="popup__submit-button popup__submit-button_disabled"
              >
                Создать
              </button>
            </form>
          </div>
        </section> */}
      {/* <section name="imagePopup" className="popup popup_wide">
          <div className="popup__container popup__container_wide">
            <h2 className="popup__title popup__title_white" />
            <button type="button" className="popup__close-button" />
            <img src="#" alt="#" className="popup__image" />
          </div>
        </section> */}
      {/* <section name="confirmPopup" className="popup">
          <div className="popup__container">
            <button type="button" className="popup__close-button" />
            <form noValidate="" name="confirmPopupForm" className="popup__form">
              <h2 className="popup__title popup__title_reborder">
                Вы уверены?
              </h2>
              <button type="submit" className="popup__submit-button">
                Да
              </button>
            </form>
          </div>
        </section> */}
      {/* <section name="avatarPopup" className="popup">
          <div className="popup__container">
            <button type="button" className="popup__close-button" />
            <form noValidate="" name="avatarPopupForm" className="popup__form">
              <h2 className="popup__title">Обновить аватар</h2>
              <input
                type="url"
                name="avatar"
                id="avatar"
                className="popup__input"
                placeholder="Название"
                required=""
              />
              <span className="popup__input-error popup__input-error_avatar" />
              <button
                type="submit"
                className="popup__submit-button popup__submit-button_disabled"
              >
                Сохранить
              </button>
            </form>
          </div>
        </section> */}
      <Footer />
    </div>
  );
}

export default App;
