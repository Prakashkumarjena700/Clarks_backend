const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    fullname: String,
    gender: String,
    age: String,
    country: String,
    email: String,
    password: String,
    image: String
})

const adminModel = mongoose.model("admins", adminSchema)

module.exports = {
    adminModel
}