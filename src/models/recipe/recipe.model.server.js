var mongoose = require('mongoose');
var RecipeSchema = require('./recipe.schema.server.js');
var RecipeModel = mongoose.model('RecipeModel', RecipeSchema);

RecipeModel.createRecipe = createRecipe;
RecipeModel.findById = findById;
RecipeModel.updateRecipe = updateRecipe;
RecipeModel.deleteRecipe = deleteRecipe;

module.exports = RecipeModel;

function createRecipe(recipe) {
    return RecipeModel.create(recipe).then(function(newRecipe) {
        return newRecipe;
    });
}

function findById(recipeId) {
    return RecipeModel.findOne({ _id: recipeId }).then(function(recipe) {
        return recipe;
    });
}

function updateRecipe(recipeId, recipe) {
    return RecipeModel.findOneAndUpdate({ _id: recipeId }, { $set: recipe }, { new: true }).then(function(updatedRecipe) {
        return updatedRecipe;
    });
}

function deleteRecipe(recipeId) {
    return RecipeModel.findOneAndRemove({ _id: recipeId }).then(function(deletedRecipe) {
        return deletedRecipe;
    });
}