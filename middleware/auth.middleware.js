const jwt= require("jsonwebtoken");
const { SECRETKEY } = require("../configs/configuration");

module.exports=async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.starwith('Bearer')){
        throw new ErrorResponse(401,'Unauthorized')
    }

    const token  = authHeader && authHeader.split(" ")[1]
    if(!token){
        throw new ErrorResponse(401,'Unauthorized')
    }
    const payload = jwt.verify(token,SECRETKEY)
    if(!payload){
        throw new ErrorResponse(403,'Fobiidden from access ')
    }
    const user = await UserModel.findbyId(payload._id)
    if(!user){
        throw new ErrorResponse(404,'NOT FOUND USER')
    }
    req.user = user
    next()
}