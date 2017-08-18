var app = require('../../express');
var CommentModel = require('../models/comment/comment.model.server.js');

app.get('/api/recipe/:recipeId/comment', getCommentsForRecipe);
app.post('/api/recipe/:recipeId/comment', postCommentForRecipe);
app.put('/api/recipe/:recipeId/comment/:commentId', editComment);
app.delete('/api/recipe/:recipeId/comment/:commentId', deleteComment);


function getCommentsForRecipe(req, res) {
    var recipeId = req.params.recipeId;

    CommentModel.getCommentsForRecipe(recipeId).then(function(comments) {
        comments.reverse();
        res.send(comments);
    });
}

function postCommentForRecipe(req, res) {
    var comment = req.body.comment;
    var userId = req.body.userId;
    var recipeId = req.params.recipeId;

    var commentObj = {
        comment: comment,
        user: userId,
        recipe: recipeId
    }

    CommentModel.createComment(commentObj).then(function(newComment) {
        res.send(newComment);
    });
}

function editComment(req, res) {
    var commentId = req.params.commentId;
    var comment = req.body.comment;

    CommentModel.updateComment(commentId, comment).then(function() {
        res.send(204);
    });
}

function deleteComment(req, res) {
    var commentId = req.params.commentId;

    CommentModel.deleteComment(commentId).then(function() {
        res.send(204);
    });
}