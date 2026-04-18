import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export const verifyToken = (...allowedRoles) => {
    return async (req,res,next)=>{
        try{
    //read token from req
    let token=req.cookies.token//{token:""}
    console.log("token:",token)
    if(token===undefined)
        return res.status(400).json({message:"unathorized req,plz login"})
    //verify the validity of the token(decoding token)
    //we should decode the token with same secret key then token is valid
    let decodedToken=jwt.verify(token,process.env.JWT_SECRET)

    //check if role is allowed
    if(!allowedRoles.includes(decodedToken.role))
        return res.status(403).json({message:"Forbidden.you dont have access"})
    //attach user info to req for use in routes
    req.user=decodedToken
    //forward req to next middleware/route
    next()
}

catch(err){
    //jwt.verify throws if token is invalid/expired
    if(err.name==="TokenExpiredError")
        return res.status(401).json({message:"Session expired.plz login"})
    if(err.name==="JsonWebTokenError")
        return res.status(401).json({message:"Invalid Token.plz login again"})

    //next(err)
}
}}