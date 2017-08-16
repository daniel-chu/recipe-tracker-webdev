var mongoose = require('mongoose');

var RecipeSchema = mongoose.Schema({
    _id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    image_url: String
}, {
    collection: 'recipe',
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

RecipeSchema.virtual('recipe_id').get(function() {
    return this._id;
});

module.exports = RecipeSchema;