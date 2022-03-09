import jwt  from "jsonwebtoken"

const generateToken = (user) => {
    return (
        jwt.sign({_id: user._id, email: user.email, fullName: user.fullName}, process.env.LOGIN_TOKEN)
    )
}

export default generateToken