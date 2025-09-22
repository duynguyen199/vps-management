const UserModel = require("../model/User.model");

module.exports = {
  getAllUsers: async (req, res, next) => {
    const user = await UserModel.find();
    return res.status(200).json(user);
  },
  getUserById: async(req,res,next)=>{
    const userId = req.user._id
    const user = await UserModel.findById(userId)
    if(!user){
      throw new ErrorResponse(404,'NOT FOUND USER')
    }

    res.status(200).json({
      id:user._id,
      username:user.username,
      email:user.email,
      role:user.role,
      balance:user.balance
    })
  },
  updateUserById: async(req,res,next)=>{
    const userId = req.params.id
    const authentiCatedUserId  = req.user._id
    if(userId !== authentiCatedUserId.toString()){
      throw new ErrorResponse(403,'FORBIDDEN TO UPDATE OTHER USER')
    }
    const {password,...updatedData} = req.body
    try {
      const updateUser = await UserModel.findByIdAndUpdate(userId,updatedData,{new:true})
      if(!updateUser){
        throw new ErrorResponse(404,'NOT FOUND USER')
      }
      return res.status(200).json(updateUser)
    } catch (error) {
    res.status(500).json({ message: 'Error updating user.', error: error.message });
    }
  }

};
