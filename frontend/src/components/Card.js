import React from "react";
import { Link } from "react-router-dom";
import "./Card/Card.css";

function Card({
  handlePostDelete,
  text,
  id,
  image,
  comments,
  keyword,
  date,
  title,
  loggedIn,
}) {
  // const card = {
  //   _id: id,
  //   link: src,
  //   name: title,
  //   owner: owner,
  //   likes: likes,
  // };

  function handleClick() {
    // onCardClick({ link: src, name: title });
  }

  function handleDelete() {
    handlePostDelete(id);
  }

  return (
    // <li className="cards__element">
    //   <img
    //     className="cards__element-img"
    //     src={image}
    //     alt={image}
    //     onClick={handleClick}
    //   />
    //   <button
    //     className={deleteButton}
    //     type="button"
    //     title="Удалить"
    //     onClick={handleDelete}
    //   ></button>
    //   <div className="cards__description">
    //     <h2 className="cards__element-title">{keyword}</h2>
    //     <div className="cards__element-wrap">
    //       {/* <button
    //         className={likeButton}
    //         type="button"
    //         title="Нравится"
    //         onClick={handleLike}
    //       ></button> */}
    //       <p className="">{text}</p>

    //       {comments.map((item) => (
    //         <p className="">{item.postedBy}</p> &&
    //         <p className="">{item.text}</p>
    //         // идея - передавать кнопке в пропсе айди коментария для удаления

    //       ))}

    //       {comments.forEach((item) => (
    //         console.log(item)

    //       ))}
    //     </div>
    //   </div>
    // </li>

    <li className="news-card">
      {loggedIn && (
        <button onClick={handleDelete} className="news-card__marker">
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

      <div className={`news-card__tag`}>{keyword}</div>

      <img className="news-card__img" src={image} alt="Post" />
      <div className="news-card__info">
        <p className="news-card__date">
          {new Date(date).toLocaleString("ru", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Link className="news-card__title" to={`/posts/${id}`}>
          {title}{" "}
          <span className="news-card__title_span">({comments.length})</span>
        </Link>
        {/* <h3 className="news-card__title">{title} </h3> */}
      </div>
    </li>
  );
}

export default Card;
