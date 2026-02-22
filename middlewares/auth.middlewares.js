import jwt  from "jsonwebtoken";

function verifytoken(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({ meassage:"unauthorized"})
    }
}

export default verifytoken