const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
 
    status: {
        type: String,
        required: true
    },
  
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    avatar: {
        type: String
    },
    following: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    followers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
