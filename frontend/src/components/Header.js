import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/header-logo.png";

function Header({ email, signOut, loggedIn }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo_link">
        <img src={logo} alt="логотип" className="header__logo" />
      </Link>

      <div className="header__wrap">
        <p className="header__email">{email}</p>
        {loggedIn && (
          <button onClick={signOut} className="header__paragraph">
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
