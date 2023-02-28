const express = require("express")
const { dataModel } = require("../model/data.model")

const dataRoute = express.Router()

dataRoute.get("/", async (req, res) => {
    const user_id_making_req = req.body.user
    try {
        let data = await dataModel.find({ user: user_id_making_req })
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