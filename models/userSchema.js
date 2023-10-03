const { model , Schema} = require('mongoose');
const validator = require('validator');
const userSchema = new Schema({
    username : {
        type : String,
       required : [true, 'Username must be entered'],
    },
    password : String,
    email : String,
    createdAt : Date
});

module.exports = model('User', userSchema)