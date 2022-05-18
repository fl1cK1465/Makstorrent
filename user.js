const mongodb = require('mongodb')


module.exports = mongodb.model('User',{
    username : {type: String },
    password : {type: String},
    city: {type: String},
    country: {type: String},
    email: {type: String}
})