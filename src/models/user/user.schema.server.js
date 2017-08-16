var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: String,
    proPicUrl: { type: String, default: '/assets/images/defaultProfilePicture.jpg' },
    sharedRecipes: [{ type: String, ref: 'RecipeModel' }],
    likedRecipes: [{ type: String, ref: 'RecipeModel' }],
    dateCreated: { type: Date, default: Date.now }
}, { collection: 'user' });

module.exports = UserSchema;