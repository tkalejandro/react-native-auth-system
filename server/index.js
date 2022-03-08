import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan";
//? Routes
import auth from "./routes/auth.js"
import verifyToken from "./middleware/verifyToken.js";

const app = express()
dotenv.config()

app.use(morgan("tiny"))
app.use(express.json()); //? Body PArser
app.get("/", (req, res) => {
    res.send("Welcome to the auth system")
})
app.get("/api/user/profile", verifyToken(), (req, res) => {
    res.send('This is the user profile')
})

app.use("/api/users", auth)

const port = process.env.PORT || 3000

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.3hieq.mongodb.net/housing_app?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    
    app.listen(port, () => console.log(`Server is running on ${port}`))
})
.catch( err => console.log(err))