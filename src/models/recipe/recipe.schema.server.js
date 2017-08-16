var mongoose = require('mongoose');

var RecipeSchema = mongoose.Schema({
    _id: {type: String, unique: true, required: true },
    title: { type: String, required: true },
    image_url: String
}, { collection: 'recipe' });

module.exports = RecipeSchema;