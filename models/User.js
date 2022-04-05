// this is where we define our schema
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true,
        max: 255,
        min: 6
    }
})


module.exports = mongoose.model('User', userSchema);