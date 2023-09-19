import React from "react";

export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <article className="card">
            <img
                className="card__image"
                src={props.card.link}
                alt={props.card.name}
                onClick={handleClick}
            />
            <button type="button" className="card__delete-button" />
            <div className="card__description">
                <h2 className="card__title" />
                <div className="card__like">
                    <button type="button" className="card__like-button" />
                    <p className="card__like-counter">
                        {props.card.likes.length}
                    </p>
                </div>
            </div>
        </article>
    );
}
