import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => console.log(err));
        api.getCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        (isLiked ? api.removeLike(card._id) : api.putLike(card._id)).then(
            (newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            }
        );
    }

    function handleUpdateUser(userInfo) {
        setLoading(true);
        api.editProfileInfo(userInfo)
            .then((info) => {
                setCurrentUser(info);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    function handleUpdateAvatar(userInfo) {
        setLoading(true);
        api.changeAvatar(userInfo)
            .then((info) => {
                setCurrentUser(info);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) =>
                    cards.filter((item) => item._id !== card._id)
                );
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(newCardData) {
        setLoading(true);
        api.addCard(newCardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

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
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    onCardLike={handleCardLike}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onLoading={isLoading}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onLoading={isLoading}
                />
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
        </CurrentUserContext.Provider>
    );
}

export default App;
