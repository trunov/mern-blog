import React from "react";
import Card from "./Card";
import SearchForm from "./SearchForm/SearchForm";
import NotFound from "./NotFound/NotFound";

function Main({
  cards,
  loggedIn,
  handleSearch,
  emptySearch,
  handlePostDelete,
  handleEditPostClick
}) {
  return (
    <main className="content">
      <section className="profile">
        <SearchForm handleSearch={handleSearch} />
        {loggedIn && (
          <button
            className="profile__add-button"
            type="button"
            onClick={handleEditPostClick}
          ></button>
        )}
        {emptySearch && <NotFound />}
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map((item) => (
            <Card
              key={item._id}
              num={item.id}
              id={item._id}
              image={item.image}
              keyword={item.keyword}
              text={item.text}
              comments={item.comments}
              date={item.date}
              title={item.title}
              loggedIn={loggedIn}
              handlePostDelete={handlePostDelete}
            />
          )).reverse()}
        </ul>
      </section>
    </main>
  );
}

export default Main;
