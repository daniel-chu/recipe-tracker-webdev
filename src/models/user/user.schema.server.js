var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
    sharedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel' }],
    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RecipeModel' }],
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'user' });

module.exports = UserSchema;