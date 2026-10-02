import userModel from"../../models/user.model.js" 
import * as dbService from "../../db.service.js"

export const signUp = async (req,res,next)=>{

const {fName,lName,email,password,age,gender}=req.body
const emailExist =await dbService.findOne({model:userModel, filter:{email:email.toLowerCase()}})
if(emailExist)
{
  throw new Error("email already exist")
}
const user = await dbService.create({model:userModel,
    data:{fName,lName,email,password,age,gender}
})
return res.status(201).json({message :"Done",user})

//return res.status(500).json({message :"fail to signup",error:error.message})
    
}


export const signIn =async (req,res,next)=>{

    const {email,password}=req.body
   const user = await dbService.findOne(
   { model:userModel,
    filter:{email:email.toLowerCase()}})
   if(!user){
    throw new Error("email is not exist",{cause: 400})

   }
   if(user.password!== password){
    throw new Error("invalid password")
   }
//    if(user.isConfirmed !== true){
// return res.status(400).json({message :"email is not confirmed"})
//    }
   return res.status(200).json({message :"done",user})

}