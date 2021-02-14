const Article = require("../models/article");

const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");

module.exports.getPosts = (req, res, next) => {
  Article.find({})
    .then((posts) => {
      if (!posts) {
        throw new NotFoundError("Статьи не найдены");
      } else {
        res.send(posts);
      }
    })
    .catch(next);
};


module.exports.searchPost = (req, res, next) => {
  Article.find({keyword: req.params.postKeyword})
    .then((posts) => {
      if (!posts) {
        throw new NotFoundError("Статьи не найдены");
      } else {
        res.send(posts);
      }
    })
    .catch(next);
};


module.exports.createPost = (req, res, next) => {
  const { keyword, title, text, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    image,
  })
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError("Ошибка валидации. Введены некорректные данные")
        );
      }
      next(err);
    });
};

module.exports.createComment = (req, res, next) => {
  const comment = {
    text: req.body.text,
    postedBy: req.body.postedBy,
  };
  Article.findByIdAndUpdate(
    req.params.articleId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Нет поста с таким id");
      } else {
        res.send(article.comments);
      }
    })
    .catch(next);
};

module.exports.deletePost = (req, res, next) => {
  console.log(req.params.articleId);
  Article.findByIdAndRemove(req.params.articleId)
    .then((post) => {
      if (!post) {
        throw new NotFoundError("Статья не найдена");
      } else {
        res.send(post);
      }
    })
    .catch(next);
};

module.exports.deleteComment = (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.articleId,
    { $pull: { comments: { _id: req.body.commentId } } },
    { new: true }
  )
    .then((article) => {
      if (!article) {
        throw new NotFoundError(
          "Карточки с таким id не существует, невозможно забрать лайк"
        );
      }
      res.send(article.comments);
    })
    .catch(next);
};
