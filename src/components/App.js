import React, { useState } from "react";
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
                submitName="Сохранить"
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
                submitName="Сохранить"
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
                submitName="Добавить"
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
                submitName="Да"
                onClose={closeAllPopups}
            ></PopupWithForm>
            <Footer />
        </div>
    );
}

export default App;
