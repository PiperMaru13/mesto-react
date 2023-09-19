import React, { useEffect, useState } from "react";
import api from "../utils/Api.js";
import editPic from "../images/edit.svg";
import Card from "./Card.js";

export default function Main(props) {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getProfileInfo()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((err) => console.log(err));
        api.getCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <img
                    style={{ backgroundImage: `url(${userAvatar})` }}
                    className="profile__avatar"
                />
                <button
                    className="profile__edit-avatar"
                    type="button"
                    onClick={props.onEditAvatar}
                >
                    <img
                        src={editPic}
                        alt="Редактировать"
                        className="profile__edit-ico"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={props.onEditProfile}
                    ></button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="elements" aria-label="Фотокарточки">
                <template id="card-template" />
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                    />
                ))}
            </section>
        </main>
    );
}
