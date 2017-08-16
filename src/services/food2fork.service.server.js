var app = require('../../express');
var request = require('request');

app.get('/api/food2fork/search', searchFood2Fork);
app.get('/api/food2fork/:rid', getFood2ForkRecipe);

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