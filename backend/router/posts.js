const router = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getPosts,
  createPost,
  deletePost,
  createComment,
  searchPost
} = require('../controllers/posts');

const {
  validatePost,
  validateArticleId,
} = require('../middlewares/celebrateHandlers');

router.get('/', getPosts);
router.get('/keyword', searchPost);
router.post('/', auth, validatePost, createPost);
router.delete('/:articleId', validateArticleId, deletePost);
router.put('/:articleId', createComment);

module.exports = router;
