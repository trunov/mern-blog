import React from "react";
import "./comment.css";

function Comment({
  loggedIn,
  handleDeleteComment,
  commentId,
  id,
  name,
  message,
}) {
  function onCommentButtonSubmit() {
    handleDeleteComment(id, commentId);
  }

  return (
    <li className="comment__container">
      <div className="comment__wrapper">
        <p className="comment__name">{name}</p>
        <p className="comment__paragraph">{message}</p>
      </div>

      {loggedIn && (
        <button
          onClick={onCommentButtonSubmit}
          className="comment__trash-marker "
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="news-card__delete"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 0H6V2H0V4H18V2H12V0ZM2 6V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6H2ZM6 6L6 15H8L8 6H6ZM10 6V15H12V6H10Z"
              fill="#B6BCBF"
            />
          </svg>
        </button>
      )}
    </li>
  );
}

export default Comment;
