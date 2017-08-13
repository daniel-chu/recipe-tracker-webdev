var app = require('../../express');
var request = require('request');

app.get('/api/food2fork/search', searchFood2Fork);
app.get('/api/nutritionix/search', searchNutritionix);
app.get('/api/food2fork/:rid', getFood2ForkRecipe);
app.get('/api/nutritionix/:nid', getNutritionixItem);

function searchFood2Fork(req, res) {
    var searchString = req.query.searchString;
    var pageNum = req.query.pageNum
    var url = 'http://food2fork.com/api/search';
    url += '?key=' + process.env.F2F_APIKEY + '&q=' + searchString + '&sort=r&page=' + pageNum;

    request({
        method: 'GET',
        url: url
    }, function(error, response, body) {
        res.send(body);
    });
}

function searchNutritionix(req, res) {
    var searchString = req.query.searchString;
    var url = 'https://api.nutritionix.com/v1_1/search';
    url += '/' + searchString + '?appId=' + process.env.NUTRITIONIX_APPID + '&appKey=' + process.env.NUTRITIONIX_APPKEY;
    url += '&results=0:30&fields=*';

    request({
        method: 'GET',
        url: url
    }, function(error, response, body) {
        res.send(body);
    });
}

function getFood2ForkRecipe(req, res) {
    var recipeId = req.params.rid;

    var url = 'http://food2fork.com/api/get';
    url += '?key=' + process.env.F2F_APIKEY + '&rId=' + recipeId;

    request({
        method: 'GET',
        url: url
    }, function(error, response, body) {
        res.send(body);
    });
}

function getNutritionixItem(req, res) {
    var nutritionItemId = req.params.nid;

    var url = 'https://api.nutritionix.com/v1_1/item';
    url += '?id=' + nutritionItemId + '&appId=' + process.env.NUTRITIONIX_APPID + '&appKey=' + process.env.NUTRITIONIX_APPKEY;

    request({
        method: 'GET',
        url: url
    }, function(error, response, body) {
        res.send(body);
    });
}