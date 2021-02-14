import React from "react";
import "./PostPopup/postPopup.css";


function PostPopup({
  image, title, isOpen, onClose,
}) {
  return (
    <div className={`popup popup-img ${isOpen && "popup_opened"}`} id="popup-image">
      <div className="popup__img-container">
        <button aria-label="Закрыть картинку" type="button" className="popup__close-button" onClick={onClose}></button>
        <img src="https://specials-images.forbesimg.com/imageserve/601d2c104b9dea11eaf9b5aa/960x0.jpg?fit=scale" alt={title} className="popup__full-img" />
        <h2 className="popup__title">Something</h2>
        <p>Something</p>
      </div>
    </div>
  );
}

export default PostPopup;
