import { check } from "express-validator"


const loginValidation = () => {
    //? Return []

    return [
        check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
        check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least six characters.')
    ]
}

export default loginValidation