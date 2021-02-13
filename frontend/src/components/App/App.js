import "./App.css";

import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";
import EditPostPopup from "../EditPostPopup";
import { api } from "../../utils/api";
import * as auth from "../../utils/auth";
import Login from "../Login";
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const [isEditPostPopup, setIsEditPostPopup] = React.useState(false);

  const [emptySearch, setEmptySearch] = React.useState(false);

  const history = useHistory();

  function handleEditPostClick() {
    setIsEditPostPopup(true);
  }

  function closeAllPopups() {
    setIsEditPostPopup(false);
  }

  function handleLogin(email, password) {
    // console.log(email, password);
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        // setDataInfoTool({
        //   title: "Что-то пошло не так! Попробуйте ещё раз.",
        //   icon: failLogo,
        // });

        // handleInfoTooltipOpen();

        console.error(err);
      });
  }

  function handleAddPost(keyword, title, text, image) {
    api
      .addNewPost({ keyword, title, text, image })
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleSearch(input) {
    api
      .searchPosts(input)
      .then((results) => {
        if (results.length === 0) {
          setEmptySearch(true);
          console.log("It is empty");
        } else {
          setEmptySearch(false);
        }
        setupCards(results);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/");
  }

  function handlePostDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== id);
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function setupCards(cards) {
    console.log(cards);
    setCards(
      cards.map((item) => ({
        _id: item._id,
        date: item.date,
        image: item.image,
        keyword: item.keyword,
        text: item.text,
        title: item.title,
        comments: item.comments,
      }))
    );
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            // setUserData(res.data.email);
           
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    console.log(api.getInitialPosts());
    api
      .getInitialPosts()
      .then((results) => {
        setupCards(results);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);

  return (
    <div className="page">
      <Header loggedIn={loggedIn} signOut={signOut} />
      <Switch>
        <Route exact path="/">
          <Main
            emptySearch={emptySearch}
            loggedIn={loggedIn}
            cards={cards}
            handleSearch={handleSearch}
            handlePostDelete={handlePostDelete}
            handleEditPostClick={handleEditPostClick}
          />
        </Route>
        <Route path="/admin">
          <Login handleLogin={handleLogin} />
        </Route>
      </Switch>
      <Footer />
      <EditPostPopup
        handleAddPost={handleAddPost}
        isOpen={isEditPostPopup}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
