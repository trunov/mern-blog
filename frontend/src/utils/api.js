/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-underscore-dangle */

const handleOriginalResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

class Api {
  constructor(options) {
    this._token = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }

  getInitialPosts() {
    return fetch(`${this._token}/articles`, {
      method: "GET",
      headers: {
        "Content-type": `${this._contentType}`,
      },
    }).then(handleOriginalResponse);
  }

  searchPosts(input) {
    return fetch(`${this._token}/articles/${input}`, {
      method: "GET",
      headers: {
        "Content-type": `${this._contentType}`,
      },
    }).then(handleOriginalResponse);
  }

  addNewPost({ keyword, title, text, image }) {
    return fetch(`${this._token}/articles`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        image,
      }),
    }).then(handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._token}/articles/${cardId}`, {
      method: "DELETE",
      headers: {
        // authorization: this._authorization,
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
    }).then(handleOriginalResponse);
  }

  createComment(cardId, postedBy, text) {
    return fetch(`${this._token}/articles/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        postedBy,
        text,
      }),
    }).then(handleOriginalResponse);
  }

  getUserInfo() {
    return fetch(`${this._token}/users/me`, {
      method: "GET",
      headers: {
        // authorization: this._authorization,
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": `${this._contentType}`,
      },
    }).then(handleOriginalResponse);
  }

  editProfile({ name, about }) {
    return fetch(`${this._token}/users/me`, {
      method: "PATCH",
      headers: {
        // authorization: this._authorization,
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(handleOriginalResponse);
  }

  deleteComment(cardId, commentId) {
    return fetch(`${this._token}/articles/comments/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        commentId
      }),
    }).then(handleOriginalResponse);
  }
}

// экземпляра класса Api
export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    // authorization: "36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8",
    // authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-type": "application/json",
  },
});
