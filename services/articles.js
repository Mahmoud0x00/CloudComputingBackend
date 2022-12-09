const Article = require('../models/article');
const ArticleComment = require('../models/articleComment');



module.exports.GetArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        return articles;
    } catch (err) {
        throw new Error("Error while getting articles");
    }
}


module.exports.WriteAnArticle = async (articleInfo) => {
    try {
        // const { title, content, OwnerID } = articleInfo;

        const article = new Article({
            title: articleInfo.title,
            content: articleInfo.content,
            Owner: articleInfo.Owner
        });
        await article.save();
    } catch (err) {
        throw new Error("Error while creating article");
        //error=err.message;
    }
}


module.exports.UpdateAnArticle = async (articleInfo) => {
    try {
        //const { articleId, title, content } = articleInfo;
        const article = await Article.findOne({
            _id: articleInfo.articleId
        });
        if (article) {
            article.title = articleInfo.title;
            article.content = articleInfo.content;
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}


module.exports.deleteArticle = async (articleId) => {
    try {
        const article = await Article.findOne({
            _id: articleId
        });
        if (article) {
            await article.remove();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}



module.exports.AddACommentOnTheArticle = async (commentInfo) => {
    try{
        const article = await Article.findOne({
            _id: articleId
        });
        if (article) {
            const comment = new ArticleComment({
                content: commentInfo.comment,
                Owner: commentInfo.OwnerID
            });
            article.comments.push(comment);
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}
//     try{
//         const articleID = await Article.findOne({
//             _id: articleId
//         });
//         const articleComment = new ArticleComment({
//             Owner: commentInfo.Owner,
//             Article: articleID,
//             Comment: commentInfo.content
//     });
//     await articleComment.save();
// } catch (err) {
//     throw new Error("Error While Adding Comment");
//     //error=err.message;
// }
// }

module.exports.GetArticleComments = async (commentInfo) => {
    try {
        // const { articleId, commentId } = commentInfo;
        const article = await Article.findOne({
            _id: commentInfo.articleId
        });
        if (article) {
            const comment = article.comments.find((comment) => {
                return comment._id == commentInfo.commentId;
            });
            return comment;
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}



module.exports.EditACommentOnTheArticle = async (commentInfo) => {
    try {
        //const { articleId, commentId, content } = commentInfo;
        const article = await Article.findOne({
            _id: commentInfo.articleId
        });
        if (article) {
            const comment = article.comments.find((comment) => {
                return comment._id == commentInfo.commentId;
            });
            comment.content = commentInfo.content;
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}



module.exports.DeleteACommentOnTheArticle = async (commentInfo) => {
    try {
        // const { articleId, commentId } = commentInfo;
        const article = await Article.findOne({
            _id: commentInfo.articleId
        });
        if (article) {
            const comment = article.comments.find((comment) => {
                return comment._id == commentInfo.commentId;
            });
            article.comments.pull(comment);
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}



module.exports.AddALikeOnTheArticle = async (likeInfo) => {
    try {
        //const { articleId, like } = likeInfo;
        const article = await Article.findOne({
            _id: likeInfo.articleId
        });
        if (article) {
            article.Likes += 1;
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}


module.exports.DeleteALikeOnTheArticle = async (likeInfo) => {
    try {
        //const { articleId, likeId } = likeInfo;
        const article = await Article.findOne({
            _id: likeInfo.articleId
        });
        if (article) {
            article.Likes -= 1;
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}


module.exports.AddADislikeOnTheArticle = async (dislikeInfo) => {
    try {
        // const { articleId, dislike } = dislikeInfo;
        const article = await Article.findOne({
            _id: dislikeInfo.articleId
        });
        if (article) {
            article.dislikes += 1;
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}


module.exports.DeleteADislikeOnTheArticle = async (dislikeInfo) => {
    try {
        // const { articleId, dislikeId } = dislikeInfo;
        const article = await Article.findOne({
            _id: dislikeInfo.articleId
        });
        if (article) {
            article.dislikes -= 1;
            await article.save();
        } else {
            throw new Error("Article does not exist");
        }
    } catch (err) {
        throw err.message;
    }
}