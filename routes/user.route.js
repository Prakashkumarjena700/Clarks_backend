const express = require("express")
const { userModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRoute = express.Router()

userRoute.get("/",async (req,res)=>{
    try{
        let usersdata=await userModel.find()
        res.send(usersdata)
    }catch(err){
        res.send({"msg":"Can't find users"})
    }
})

userRoute.post("/register", async (req, res) => {
    const { email, firstname, lastname, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" })

        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new userModel({ email, firstname, lastname, password: hash })
                    await user.save()
                    res.send({ "msg": "new user has been register" })
                }
            });
        }

    } catch (err) {
        res.send({ "msg": "Can't register" })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "clarks")
                    res.send({ "msg": "Login sucessful", token, email: user[0].email, firstname: user[0].firstname, lastname: user[0].lastname })
                } else {
                    res.send({ "msg": "Something went wrong" })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential" })
        }
    } catch (err) {
        res.send({ "msg": "Something Wrong" })
    }
})

module.exports = {
    userRoute
}