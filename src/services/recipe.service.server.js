var app = require('../../express');
var RecipeModel = require('../models/recipe/recipe.model.server.js');

app.get('/api/recipe/:recipeId', findRecipeInfo);
app.post('/api/recipe/:recipeId', storeRecipe);


function storeRecipe(req, res) {
    var recipeInfo = req.body.recipeInfo;

    RecipeModel.createRecipe(recipeInfo).then(function(newRecipe) {
        res.send(newRecipe);
    });
}

function findRecipeInfo(req, res) {
    var recipeId = req.params.recipeId;

    RecipeModel.findById(recipeId).then(function(recipe) {
        res.send(recipe);
    });
}