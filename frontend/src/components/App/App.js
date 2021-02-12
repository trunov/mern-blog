import "./App.css";

import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";
import { api } from "../../utils/api";
import * as auth from "../../utils/auth";
import Login from "../Login";
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

  const history = useHistory();

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

  function signOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("token");
    history.push("/");
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
            setUserData(res.email);
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
    console.log(api.getInitialPosts())
    api.getInitialPosts()
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
          <Main loggedIn={loggedIn} cards={cards} />
        </Route>
        <Route path="/admin">
          <Login handleLogin={handleLogin} />
        </Route>
      </Switch>
      <Footer />

      {/* <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        /> */}

      {/* <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name={"confirm"}
          title={"Вы уверены?"}
          buttonTitle={"Да"}
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          link={selectedCard.link}
          title={selectedCard.title}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups}
        /> */}
    </div>
  );
}

export default App;
