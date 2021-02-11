const router = require('express').Router();

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
router.post('/', validatePost, createPost);
router.delete('/:articleId', validateArticleId, deletePost);
router.put('/:articleId', createComment);



module.exports = router;
