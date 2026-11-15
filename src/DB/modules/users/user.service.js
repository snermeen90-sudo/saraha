import userModel from"../../models/user.model.js" 
import * as dbService from "../../db.service.js"
import {Encrypt,Decrypt} from "../../../common/security/encrypt.js"
import {Hash,Compare} from "../../../common/security/hash.js"
import jwt from "jsonwebtoken"
import {OAuth2Client} from'google-auth-library';
import {ProviderEnum} from "../../../common/enum/user.enum.js"
import joi from "joi"
const client = new OAuth2Client();


export const signUp = async (req,res,next)=>{


const {fName,lName,email,password,age,gender,phone}=req.body
const emailExist =await dbService.findOne({model:userModel, filter:{email:email.toLowerCase()}})
if(emailExist)
{
  throw new Error("email already exist")
}
const user = await dbService.create({model:userModel,
    data:{fName,lName,email,password:await Hash(password),age,gender,phone:Encrypt(phone)}
})

return res.status(201).json({message :"Done"})
    
}


export const signUpWithGmail = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const decoded = await client.verifyIdToken({
      idToken,
      audience: "871528246438-s2ibk1mi7tanbkfei0cdlo0c4986u9ta.apps.googleusercontent.com",  
    });
    const { email, email_verified, picture, given_name, family_name } = decoded.getPayload();
    let user = await dbService.findOne({ model: userModel, filter: { email: email.toLowerCase() } });
    
    if (!user) {
      user = await dbService.create({
        model: userModel,
        data: {
          fName: given_name,
          lName: family_name,
          email,
          profileImage: picture,
          isConfirmed: email_verified,
          provider: "ProviderEnum.google"
        }
      });
    }

    
    const userId = user._id || user.id;

    const access_token = jwt.sign({ id: userId, email: user.email }, "password123", {
      expiresIn: 60 * 60 
    });
    const refresh_token = jwt.sign({ id: userId, email: user.email }, "password1256");

    return res.status(200).json({ message: "Done", tokens: { access_token, refresh_token } });
  } 
  catch (error) {
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
}
export const signIn =async (req,res,next)=>{

    const {email,password}=req.body
   const user = await dbService.findOne(
   { model:userModel,
    filter:{email:email.toLowerCase()}})
   if(!user){
    throw new Error("email is not exist",{cause: 400})

   }
   if(!await Compare(password,user.password)){
    throw new Error("invalid password")
  }
  const access_token = jwt.sign({id:user. id , email :user.email},"password123",{
    expiresIn:60*60, //"1h"
  audience:"http://localhost:4000", // to who (frontend)
  issuer:"http://localhost:3000" ,  // by who  (backend)
  notBefore:60 // not start access_token berore this time pass
  //notTimestamp:true // init(create) at this time 
})
  const refresh_token = jwt.sign({id:user. id , email :user.email},"password1256")
//    if(user.isConfirmed !== true){
// return res.status(400).json({message :"email is not confirmed"})
//    }
   return res.status(200).json({message :"done",user:{...user._doc,phone:Decrypt(user.phone)},tokens:{access_token,refresh_token}})

}

export const getProfile =async (req,res,next)=>{

  
   return res.status(200).json({message :"done",user: req.user })

}