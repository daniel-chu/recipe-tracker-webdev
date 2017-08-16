var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
    sharedRecipes: [{ type: String, ref: 'RecipeModel' }],
    likedRecipes: [{ type: String, ref: 'RecipeModel' }],
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'user' });

module.exports = UserSchema;