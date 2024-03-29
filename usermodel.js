const {Schema , model} = require('mongoose')


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    city: {type: String, required: true,},
    isAdmin: {type: Boolean, default: false},
    img: {type: String}
})

module.exports = model('User' , userSchema)