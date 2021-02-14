import React from "react";
import Comment from "../Comment/Comment";

import "./Post.css";
import { useParams } from "react-router-dom";

function Post({
  handleDeleteComment,
  submitComment,
  post,
  postComments,
  findPost,
  cards,
  loggedIn,
}) {
  const [postedBy, setPostedBy] = React.useState("");
  const [text, setText] = React.useState("");

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handlePostedByChange(e) {
    setPostedBy(e.target.value);
  }

  let { id } = useParams();

  React.useEffect(() => {
    if (cards.length > 0) {
      findPost(id);
    }
  }, [cards]);

  function onSubmit(e) {
    e.preventDefault();
    submitComment(id, postedBy, text);
  }

  // function checkComments() {
  //   if (post.comments === 0)
  // }
  // console.log(post.comments[0]);
  console.log(postComments);

  return (
    <div className="post">
      {post && (
        <div className="post__container">
          <img className="post__image" alt="img" src={post.image} />
          <h2 className="post__title">{post.title}</h2>
          <p>{post.text}</p>

          <h2 className="comment__title">
            {postComments.length > 0 ? postComments.length : 0} comments
          </h2>
          {postComments.length > 0 && (
            <ul className="comment">
              {postComments.map((comment) => (
                <Comment
                  loggedIn={loggedIn}
                  handleDeleteComment={handleDeleteComment}
                  key={comment._id}
                  commentId={comment._id}
                  id={id}
                  name={comment.postedBy}
                  message={comment.text}
                />
              ))}
            </ul>
          )}
          <form
            action="#"
            name="comment-form"
            className="comment-form"
            onSubmit={onSubmit}
            noValidate
          >
            <input
              required
              name="postedBy"
              type="text"
              placeholder="Введите имя"
              maxLength="40"
              minLength="2"
              className="comment-form__input"
              id="postedBy-input"
              value={postedBy || ""}
              onChange={handlePostedByChange}
            />
            <span id="name-input-error"></span>

            <textarea
              placeholder="Введите текст"
              className="comment-form__input"
              value={text || ""}
              onChange={handleTextChange}
              name="text"
              wrap="soft"
            ></textarea>

            <button type="submit" className="comment-form__button">
              Создать
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
