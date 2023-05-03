const mongoos = require('mongoose')

const checkoutSchema = mongoos.Schema({
    name: String,
    price: Number,
    color: String,
    size: Number,
    gender: String,
    type: String,
    quentity: Number,
    img1: String,
    address: String,
    phone: String,
    payment: String,
    user:String
})

const checkoutModel = mongoos.model('checkouts', checkoutSchema)

module.exports = {
    checkoutModel
}