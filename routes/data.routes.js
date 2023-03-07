const express = require("express")
const { dataModel } = require("../model/data.model")

const dataRoute = express.Router()

dataRoute.get("/", async (req, res) => {
    const { q, limit, skip, sort, order, type, gender, rating, color, size } = req.query

    const query = { dis: { $regex: q, $options: "i" } }

    let filter = {}

    if (gender) {
        filter.gender = gender
    }
    if (type) {
        filter.type = type
    }
    if (size) {
        filter.size = size
    }
    if (color) {
        filter.color = color
    }
    if (rating) {
        filter.rating = rating
    }

    let y = {}
    if (sort == 'rating') {
        y = { rating: order }
    } else if (sort == 'price') {
        y = { price: order }
    } else if (sort == 'name') {
        y = { name: order }
    }


    let actualFilter = {}
    for (let key in filter) {
        if (filter[key] !== ' ') {
            actualFilter[key] = filter[key]
        }
    }

    if (actualFilter.size) {
        actualFilter.size = { $in: [size] }
    }

    if (q) {
        actualFilter = query
    }

    try {



        let data = await dataModel.find(actualFilter).sort(y).limit(limit).skip(skip)
        res.send(data)

    } catch (err) {
        res.send("Can't find product")
        console.log(err)
    }
})

dataRoute.get("/:_id", async (req, res) => {
    const user_id_making_req = req.body.user
    const { _id } = req.params
    try {
        let data = await dataModel.find({ user: user_id_making_req, _id })
        res.send(data)
    } catch (err) {
        res.send({ "msg": "Can't find" })
    }
})

dataRoute.post("/add", async (req, res) => {
    try {
        const product = new dataModel(req.body)
        await product.save()
        res.send({ "msg": "Product has been added" })
    } catch (err) {
        res.send({ "msg": "Product is not added" })
        console.log(err)
    }
})

dataRoute.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id

    try {
        await dataModel.findByIdAndUpdate({ "_id": id }, payload)
        res.send({ "msg": "Product has been updated" })
    } catch (err) {
        res.send({ "msg": "Product not updated" })
    }
})

dataRoute.delete("/delete/:id", async (req, res) => {
    const id = req.params.id

    try {
        await dataModel.findByIdAndDelete({ "_id": id })
        res.send({ "msg": "Product has been Deleted" })
    } catch (err) {
        res.send({ "msg": "Product not Deleted" })
    }
})

module.exports = {
    dataRoute
}