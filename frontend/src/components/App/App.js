import "./App.css";

import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";
import EditPostPopup from "../EditPostPopup";
import PostPopup from "../PostPopup";
import Post from "../Post/Post";
import { api } from "../../utils/api";
import * as auth from "../../utils/auth";
import Login from "../Login";
function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const [selectedPost, setSelectedPost] = React.useState({ isOpen: false });

  const [isEditPostPopup, setIsEditPostPopup] = React.useState(false);

  const [post, setPost] = React.useState({});
  const [postComments, setPostComments] = React.useState([]);


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

  function handleDeleteComment(cardId, commentId) {
    api
      .deleteComment(cardId, commentId)
      .then((comments) => {
        setPostComments(comments);
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
    // console.log(cards);
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
           
            
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    api
      .getInitialPosts()
      .then((results) => {
        setupCards(results);
      })
      .catch((err) => console.log(`Error ${err}`));
  }, []);

  function findPost(id) {
    let findPost = cards.find(post => post._id === id);
    setPost(findPost);
    setPostComments(findPost.comments);
  }

  function submitComment(cardId, postedBy, text) {
    api
      .createComment(cardId, postedBy, text)
      .then((newlyGeneratedComments) => {
        let last = newlyGeneratedComments.length - 1;
        let lastComment = newlyGeneratedComments[last];
        console.log(lastComment);
        setPostComments([...postComments, lastComment]);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

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
        <Route exact path="/posts/:id">
          <Post loggedIn={loggedIn} submitComment={submitComment} postComments={postComments} handleDeleteComment={handleDeleteComment} findPost={findPost} post={post} cards={cards}/>
        </Route>
      </Switch>
      <Footer />
      <EditPostPopup
        handleAddPost={handleAddPost}
        isOpen={isEditPostPopup}
        onClose={closeAllPopups}
      />
      <PostPopup isOpen={selectedPost.isOpen}/>
    </div>
  );
}

export default App;
