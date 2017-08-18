var mongoose = require('mongoose');

var ActivitySchema = mongoose.Schema({
    action: { type: String, enum: ['LIKE', 'SHARE'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    recipe: { type: String, ref: 'RecipeModel' },
    dateCreated: { type: Date, default: Date.now }
}, {
    collection: 'activity'
});

module.exports = ActivitySchema;