const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    name: String,
    dis: String,
    price: Number,
    discount: String,
    rating: Number,
    color: String,
    size: Array,
    gender: String,
    type: String,
    quentity: Number,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String
}, {
    versionKey: false
})

const dataModel = mongoose.model("datas", dataSchema)

module.exports = {
    dataModel
}