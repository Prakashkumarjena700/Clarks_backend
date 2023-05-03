const express = require('express')

const { checkoutModel } = require('../model/checkout.model')
const { cartModel } = require('../model/cart.model')

const checkoutRoutes = express.Router()

checkoutRoutes.get('/', async (req, res) => {
    try {
        const allCheckoutProduct = await checkoutModel.find()
        res.send(allCheckoutProduct)

    } catch (err) {
        res.send('err')
        console.log(err)
    }
})

checkoutRoutes.post('/add/:_id', async (req, res) => {
    try {
        const { _id } = req.params

        const userCart = await cartModel.findOne({ _id })

        const { address, payment, user, phone } = req.body

        let checkoutObj = {
            name: userCart.name,
            price: userCart.price,
            color: userCart.color,
            size: userCart.size,
            gender: userCart.gender,
            type: userCart.type,
            quentity: userCart.quentity,
            img1: userCart.img1,
            address,
            phone,
            payment,
            user
        }

        const checkout = new checkoutModel(checkoutObj)
        await checkout.save()

        await cartModel.findByIdAndDelete({ _id })

        res.send({ 'msg': 'Added to checkout' })

    } catch (err) {
        console.log(err)
        res.send({ 'msg': 'error' })
    }
})

checkoutRoutes.get('/usercheckout', async (req, res) => {
    try {
        const userCheckout = await checkoutModel.find({ user: req.body.user })
        res.send(userCheckout)
    } catch (err) {
        console.log(err)
        res.send({ 'msg': 'error' })
    }
})


module.exports = {
    checkoutRoutes
}