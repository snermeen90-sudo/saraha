import joi from "joi"
export  const signUpSchema = {
   body: joi.object({

        fName:joi.string().required(),
        lName:joi.string().required(),
        email:joi.string().required(),
        password:joi.string().required()}
        
).required() ,
   query: joi.object({

    flag:joi.boolean().required()

}).required()}