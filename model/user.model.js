const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    firstname: String,
    lastname: String,
    password: String
},{
    versionKey:false
})

const userModel = mongoose.model("users", userSchema)

module.exports = {
    userModel
}