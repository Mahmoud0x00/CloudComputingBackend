const articleService = require('../services/articles');
const jwt = require('jsonwebtoken');

module.exports.getArticles = async (req, res) => {
    try {
        const articles = await articleService.GetArticles();
        return res.send({articles});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.postArticle = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    const articleInfo = {
        title: req.body.title,
        content: req.body.content,
        Owner : userId
      };
      try {
        const createdArticle = await articleService.WriteAnArticle(articleInfo);
        return res.status(201).send({
        msg: 'Article created successfully.',
       // articleId: createdArticle._id
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
}

module.exports.updateArticle = async (req, res) => {
    try {
        const articleInfo = req.body;
        await articleService.UpdateAnArticle(articleInfo);
        res.status(201).send({ message: "Article updated successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        await articleService.deleteArticle(articleId);
        return res.send({ message: "Article deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


module.exports.addComment = async (req, res) => {
    const userId = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).userId;
    const articleID = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET).articleId;
    const articleCommentInfo = {
        Owner: userId,
        Article: articleID,
        Comment: req.body.comment
      };
      try {
        const createdArticle = await articleService.AddACommentOnTheArticle(articleInfo);
        return res.status(201).send({
        msg: 'Comment Added Successfully.',
       // articleId: createdArticle._id
        });
      } catch (err) {
        return res.status(500).send({
          error: err.message
        });
      }
}

module.exports.GetArticleComments = async (req, res) => {
    try {
        const comments = await articleService.GetArticleComments();
        res.status(205).send({comments: comments});
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        const commentInfo = req.body;
        await articleService.UpdateACommentOnTheArticle(commentInfo);
        res.status(201).send({ message: "Comment updated successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        await articleService.deleteComment(commentId);
        return res.send({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


