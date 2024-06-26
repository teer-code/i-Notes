const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now()
    }, 
});
const User = mongoose.model('user', UserSchema);
// User.createIndexes();    //CREATE INDEXES FOR EACH VALUE HENCE wherever unique:true, IT WILL CREATE UNIQUE INDEX
module.exports = User;