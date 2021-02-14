const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getPosts,
  createPost,
  deletePost,
  createComment,
  searchPost,
  deleteComment
} = require('../controllers/posts');

const {
  validatePost,
  validateArticleId,
} = require('../middlewares/celebrateHandlers');

router.get('/', getPosts);
router.get('/:postKeyword', searchPost);
router.post('/', auth, validatePost, createPost);
router.delete('/:articleId', validateArticleId, deletePost);
router.put('/:articleId', createComment);
router.delete('/comments/:articleId', auth, deleteComment);

//delete comment

module.exports = router;
