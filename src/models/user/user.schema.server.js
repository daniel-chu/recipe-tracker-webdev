var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String },
    role: { type: String, default: 'USER', enum: ['USER', 'ADMIN'] },
    firstName: String,
    lastName: String,
    email: String,
    facebook: {
        id: String,
        token: String
    },
    google: {
        id: String,
        token: String
    },
    proPicUrl: { type: String, default: '/assets/images/defaultProfilePicture.jpg' },
    sharedRecipes: [{ type: String, ref: 'RecipeModel' }],
    likedRecipes: [{ type: String, ref: 'RecipeModel' }],
    dateCreated: { type: Date, default: Date.now }
}, {
    collection: 'user',
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

UserSchema.virtual('name').get(function() {
    return this.firstName + ' ' + this.lastName;
});

module.exports = UserSchema;