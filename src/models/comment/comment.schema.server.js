var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    recipe: { type: String, ref: 'RecipeModel' },
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'comment' });

module.exports = CommentSchema;