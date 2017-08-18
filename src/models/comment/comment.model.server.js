var mongoose = require('mongoose');
var CommentSchema = require('./comment.schema.server.js')

var CommentModel = mongoose.model('CommentModel', CommentSchema);

CommentModel.getCommentsForRecipe = getCommentsForRecipe;
CommentModel.createComment = createComment;
CommentModel.updateComment = updateComment;
CommentModel.deleteComment = deleteComment;

module.exports = CommentModel;

function getCommentsForRecipe(recipeId) {
    return CommentModel.find({ recipe: recipeId })
        .populate('user', 'username')
        .exec()
        .then(function(comments) {
            return comments;
        });
}

function createComment(comment) {
    return CommentModel.create(comment).then(function(newComment) {
        return newComment;
    });
}

function updateComment(commentId, comment) {
    return CommentModel.findOneAndUpdate({ _id: commentId }, { $set: comment }, { new: true })
        .then(function(updatedComment) {
            return updatedComment;
        });
}

function deleteComment(commentId) {
    return CommentModel.findOneAndRemove({ _id: commentId })
        .then(function(deletedComment) {
            return deletedComment;
        });
}