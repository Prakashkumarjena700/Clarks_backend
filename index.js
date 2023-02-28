const expresss = require("express")
const connection = require("./config/db")

const { userRoute } = require("./routes/user.route")
const { authenticate } = require("./middleware/authenticate.middleware")
const { dataRoute } = require("./routes/data.routes")
const { cartRoute } = require("./routes/cart.routes")
const { adminRoute } = require("./routes/admin.routes")

const app = expresss()
app.use(expresss.json())

app.get("/", (req, res) => {
    res.send("Welcome to Clarck DB")
})


app.use("/users", userRoute)
app.use("/data", dataRoute)
app.use("/admin", adminRoute)
app.use(authenticate)
app.use("/cart", cartRoute)

app.listen(4500, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log("Can't connected to db")
    }
    console.log("Server is runing at port 4500")
})