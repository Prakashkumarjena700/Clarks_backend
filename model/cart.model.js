const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    color: String,
    size: Number,
    gender: String,
    type: String,
    quentity: Number,
    img1: String,
    user: String
})

const cartModel = mongoose.model("carts", cartSchema)

module.exports = {
    cartModel
}

// "name": "UN.LOOP Black",
// "dis": "Versatile and super comfortable, this Clarks Unstructured® casual shoe in black leather features a removable OrthoLite® cushioned footbed and the unique Air Circulation System, an innovative climate control technology that keeps feet feeling fresh and comfortable all day. Slip on the Un.Loop with jeans or cords and enjoy an easy day on your feet.",
// "price": 130,
// "discount": "NEW ARRIVALS",
// "rating": 4.8,
// "color": "Black",
// "size": [
//     5,
//     5.5,
//     6,
//     6.5,
//     7,
//     7.5,
//     8,
//     8.5,
//     9,
//     9.5,
//     10,
//     10.5,
//     11
// ],
// "gender": "Women",
// "type": "Boot",
// "quentity": 1,
// "img1": "https://clarks.scene7.com/is/image/Pangaea2Build/26085071_W_1?wid=2000&hei=2000&fmt=jpg",
// "img2": "https://clarks.scene7.com/is/image/Pangaea2Build/26085071_W_2?wid=2000&hei=2000&fmt=jpg",
// "img3": "https://clarks.scene7.com/is/image/Pangaea2Build/26085071_W_4?wid=2000&hei=2000&fmt=jpg",
// "img4": "https://clarks.scene7.com/is/image/Pangaea2Build/26085071_W_6?wid=2000&hei=2000&fmt=jpg",
// "img5": "https://clarks.scene7.com/is/image/Pangaea2Build/26085071_W_5?wid=2000&hei=2000&fmt=jpg"