var app = require('../../express');
var ActivityModel = require('../models/activity/activity.model.server.js');

app.get('/api/user/:userId/activity', getXActivitiesForUser);
app.post('/api/activity/:userId/:recipeId', createActivity);
app.delete('/api/activity/:userId/:recipeId', deleteActivity);

function createActivity(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;
    var action = req.query.action;

    var activity = {
        action: action,
        user: userId,
        recipe: recipeId
    }

    ActivityModel.createActivity(activity).then(function(activity) {
        res.send(activity);
    });
}

function deleteActivity(req, res) {
    var userId = req.params.userId;
    var recipeId = req.params.recipeId;
    var action = req.query.action;

    var activity = {
        action: action,
        user: userId,
        recipe: recipeId
    }

    ActivityModel.deleteActivity(activity).then(function(deletedActivity) {
        res.sendStatus(204);
    });
}

function getXActivitiesForUser(req, res) {
    var userId = req.params.userId;
    var start = req.query.start;
    var end = req.query.end;

    ActivityModel.getXActivitiesForUser(start, end, userId).then(function(activities) {
        res.send(activities);
    });
}