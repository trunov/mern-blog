import React from "react";

import "./SearchForm.css";

function SearchForm({handleSearch}) {
  const [input, setInput] = React.useState("");

  function handleInput(evt) {
    setInput(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(input);
    setInput('');
  }

  return (
    <form className="searchForm">
      <input
        onChange={handleInput}
        className="searchForm__input"
        id="input"
        required=""
        name="input"
        type="text"
        placeholder="Введите ключевое слово"
        value={input}
      ></input>
      <button onClick={handleSubmit} type="submit" className="searchForm__button">
        Искать
      </button>
    </form>
  );
}

export default SearchForm;
