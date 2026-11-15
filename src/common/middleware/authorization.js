
export const Authorization = (role ={}) =>{
   return async(req,res,next)=>{
if(!role.includes(req.user.role))
{
    throw new Error("UnAuthorized",{cause:401})
}

    next()
} 

}
