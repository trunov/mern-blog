import React from "react";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function EditPostPopup({ isOpen, onClose, onUpdateUser, handleAddPost }) {
  const [keyword, setKeyword] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleAddPostSubmit() {
    handleAddPost(keyword, title, text, image);
  }


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    handleAddPostSubmit();
  }


  return (
    <PopupWithForm name={"edit"} title={"Добавить Статью"} buttonTitle={"Создать"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input
        required
        name="keyword"
        type="text"
        placeholder="Введите ключевое слово"
        maxLength="40"
        minLength="2"
        className="popup__input popup__input_keyword"
        id="keyword-input"
        value={keyword || ""}
        onChange={handleKeywordChange}
      />
      <span id="name-input-error"></span>
      <input
        required
        name="title"
        type="text"
        placeholder="Введите заголовок"
        maxLength="40"
        minLength="2"
        className="popup__input popup__input_title"
        id="title-input"
        value={title || ""}
        onChange={handleTitleChange}
      />
       <input
        required
        name="text"
        type="text"
        placeholder="Введите текст"
        maxLength="400"
        minLength="2"
        className="popup__input popup__input_text"
        id="text-input"
        value={text || ""}
        onChange={handleTextChange}
      />
      <input
        required
        name="image"
        type="url"
        placeholder="Введите ссылку на изображение"
        maxLength="80"
        minLength="2"
        className="popup__input popup__input_image"
        id="image-input"
        value={image || ""}
        onChange={handleImageChange}
      />
      <span id="description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditPostPopup;
