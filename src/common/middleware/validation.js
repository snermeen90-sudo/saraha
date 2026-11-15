import {signUpSchema} from "../../DB/modules/users/user.validation.js"
export const validation = (schema) =>{
    return (req,res,next)=>{

const {error} = signUpSchema.validate(req.body,{abortEarly:false })// abortEarly:to get all the error one time not the first only

if(error)
{
  return res.status(400).json({message:"validation error",error})
}
next()
}
}