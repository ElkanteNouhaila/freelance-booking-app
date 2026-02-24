import jwt  from "jsonwebtoken";

export function verifytoken(req, res, next){
    try {
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"unauthorized"})
        }

        req.user = decoded

        next()

    } catch (error) {
        console.error(error)
        return res.status(401).json({ message:"unauthorized"})
    }
}

export function authorizeRole(role) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    };
  }

