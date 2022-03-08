import jwt from "jsonwebtoken";


const verifyToken = () => async (req, res, next) => {
   try {
    const token = req.header('auth-token')
    if(!token) return  res.status(401).json({message: "Access denied"})

    const verifyToken = jwt.verify(token, process.env.LOGIN_TOKEN)
    req.user = verifyToken
    next()
   } catch (err) {
        console.log(err)
        res.status(400).json({message: err})
   }



}

export default verifyToken