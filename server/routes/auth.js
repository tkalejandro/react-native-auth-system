import express from "express"
import errorValidationChecker from "../middleware/errorValidationChecker.js"
import User from "../models/User.js"
import userValidation from "../validator/userValidation.js"
import bcrypt from "bcryptjs"
import loginValidation from "../validator/loginValidation.js"
import generateToken from "../helpers/generateToken.js"

const router = express.Router()

router.post("/register", [userValidation(), errorValidationChecker()], async (req, res) => {
    try {
        //? User exist?

        const userExist = await User.findOne({email: req.body.email})
        if (userExist) return res.status(400).json({success: false, message: "Email Already Exist"})

        const hashPassword = await bcrypt.hash(req.body.password, 12)

        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword
        })
        await user.save()
        const token = generateToken(user)
        res.json({
            success: true,
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token
           
        })


    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, err })
    }
})

router.post("/login",[loginValidation(), errorValidationChecker()],  async (req, res) => {
    try {
        //? Is this Email Valid?
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(404).json({success: false, message: "Email not found"})

        //? Is password correct.
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(404).json({success: false, message: "Invalid Email or Password"})

        //? Create and assign a token. Install jsonwebtoken
        //? The last part is the secret.
        const token = generateToken(user)

        res.header('auth-token', token).json({success: true, message: 'Logged in successfully', token: token})
        
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err})
    }
})

export default router