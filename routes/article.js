const {Router} = require('express');

const articleController = require('../controllers/articles');

const articlaValidator = require('../validators/article');

const articleRouter = Router();

const articleComment = require('../models/articleComment');

const isAuthenticated = require('../middleware/auth');




articleRouter.post('/postArticle',isAuthenticated,
articleController.postArticle);
articleRouter.get('/getArticles', articleController.getArticles);
  
articleRouter.put('/updateArticle', isAuthenticated ,articleController.updateArticle);
articleRouter.delete('/deleteArticle/:id',isAuthenticated, articleController.deleteArticle);

articleRouter.post('/addComment', isAuthenticated,articleController.addComment);
articleRouter.put('/updateComment', isAuthenticated,articleController.updateComment);
articleRouter.get('/getArticleComments', articleController.GetArticleComments);
articleRouter.delete('/deleteComment/:id',isAuthenticated, articleController.deleteComment);

module.exports = articleRouter;




