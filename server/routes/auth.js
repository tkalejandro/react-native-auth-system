import express from "express"
import errorValidationChecker from "../../../server/middleware/errorValidationChecker.js"
import User from "../models/User.js"
import userValidation from "../validator/userValidation.js"
import bcrypt from "bcryptjs"
import loginValidation from "../validator/loginValidation.js"
import jwt  from "jsonwebtoken"
const router = express.Router()

router.post("/register", [userValidation(), errorValidationChecker()], async (req, res) => {
    try {
        //? User exist?

        const userExist = await User.findOne({email: req.body.email})
        if (userExist) return res.status(400).send('Email already exists')

        const hashPassword = await bcrypt.hash(req.body.password, 12)

        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword
        })
        await user.save()

        res.json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
        })


    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err })
    }
})

router.post("/login",[loginValidation(), errorValidationChecker()],  async (req, res) => {
    try {
        //? Is this Email Valid?
        const user = await User.findOne({email: req.body.email})
        if (!user) return res.status(404).send('Email not found.')

        //? Is password correct.
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(404).send('Invalid email or password')

        //? Create and assign a token. Install jsonwebtoken
        //? The last part is the secret.
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.LOGIN_TOKEN)

        res.header('auth-token', token).json({message: 'Logged in successfully', token: token})
        
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err})
    }
})

export default router