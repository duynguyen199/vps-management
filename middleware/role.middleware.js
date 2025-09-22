module.exports = (roles)=>{
    if(typeof roles === "string"){
        roles=[roles]
    }
    return(req,res,next)=>{
        const user = req.user
        if(!roles.includes(user.role)){
            throw new ErrorResponse(403,'Forbidden from role')
        }
        next()
    }
}