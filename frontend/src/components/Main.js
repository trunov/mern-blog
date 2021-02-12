import React from "react";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  loggedIn,
}) {
  return (
    <main className="content">
      {loggedIn && (
        <section className="profile">
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
      )}

      <section className="cards">
        <ul className="cards__container">
          {cards.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              image={item.image}
              keyword={item.keyword}
              text={item.text}
              comments ={item.comments}
              date={item.date}
              title={item.title}
              loggedIn={loggedIn}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
