const express = require("express")
const { dataModel } = require("../model/data.model")

const dataRoute = express.Router()

dataRoute.get("/", async (req, res) => {
    const { q, limit, skip, sort, order, type, gender, rating, color, size } = req.query

    const query = { dis: { $regex: q, $options: "i" } }

    let x;
    if (q == undefined && gender == undefined && rating === undefined && color == undefined && type == undefined && size == undefined) {
        x = {}
    } else if (q !== undefined && gender == undefined && color == undefined && rating === undefined && type == undefined && size == undefined) {
        x = query
    } else if (q == undefined && gender !== undefined && color == undefined && rating === undefined && type == undefined && size == undefined) {
        x = { gender }
    } else if (q == undefined && gender !== undefined && color !== undefined && rating !== undefined && type != undefined && size == undefined) {
        x = { color, gender, rating, type }
    } else if (q == undefined && gender == undefined && rating === undefined && color !== undefined && type == undefined && size == undefined) {
        x = { color }
    } else if (q == undefined && gender == undefined && rating !== undefined && color !== undefined && type == undefined && size == undefined) {
        x = { rating, color }
    } else if (q == undefined && gender !== undefined && rating === undefined && color !== undefined && type == undefined && size == undefined) {
        x = { color, gender }
    } else if (q == undefined && gender !== undefined && rating !== undefined && color == undefined && type == undefined && size == undefined) {
        x = { gender, rating }
    } else if (q == undefined && gender == undefined && rating == undefined && color == undefined && type !== undefined && size == undefined) {
        x = { type }
    } else if (q == undefined && gender == undefined && rating == undefined && color !== undefined && type !== undefined && size == undefined) {
        x = { type, color }
    } else if (q == undefined && gender == undefined && rating !== undefined && color == undefined && type !== undefined && size == undefined) {
        x = { type, rating }
    } else if (q == undefined && gender !== undefined && rating == undefined && color == undefined && type !== undefined && size == undefined) {
        x = { type, gender }
    } else if (q == undefined && gender === undefined && rating == undefined && color == undefined && type === undefined && size !== undefined) {
        x = { size: { $in: [size] } }
    } else if (q == undefined && gender === undefined && rating == undefined && color == undefined && type !== undefined && size !== undefined) {
        x = { size: { $in: [size] }, type }
    } else if (q == undefined && gender === undefined && rating == undefined && color !== undefined && type !== undefined && size !== undefined) {
        x = { size: { $in: [size] }, type, color }
    } else if (q == undefined && gender === undefined && rating !== undefined && color !== undefined && type !== undefined && size !== undefined) {
        x = { size: { $in: [size] }, type, color, rating }
    } else if (q == undefined && gender !== undefined && rating !== undefined && color !== undefined && type !== undefined && size !== undefined) {
        x = { size: { $in: [size] }, type, color, rating, gender }
    }

    let y = {}
    if (sort == 'rating') {
        y = { rating: order }
    } else if (sort == 'price') {
        y = { price: order }
    } else if (sort == 'name') {
        y = { name: order }
    }

    try {
        let data = await dataModel.find(x).sort(y).limit(limit).skip(skip)
        res.send(data)

    } catch (err) {
        res.send("Can't find product")
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