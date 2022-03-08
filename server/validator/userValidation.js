import { check } from "express-validator"


const userValidation = () => {
    //? Return []

    return [
        check('fullName')
        .isLength({min: 2})
        .withMessage('Your full name is required.'),
        check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
        check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least six characters.')
    ]
}

export default userValidation