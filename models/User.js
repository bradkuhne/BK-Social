const { Schema, model } = require('mongoose');


// Define the UserSchema
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: 'You need to provide a user name!',
        trim: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/],
        required: true,
        unique: true,
        trim: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);
// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;