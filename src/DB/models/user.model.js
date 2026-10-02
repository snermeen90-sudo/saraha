import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
   fName:{
    type:String,
    require:true,
    trim:true, //outerspace
    minLength:2,
    maxLength:8
   },
    lName:{
    type:String,
    require:true,
    trim:true, //outerspace
    minLength:2,
    maxLength:8
   },
   email:{
    type:String,
    require:true,
    trim:true, //outerspace
    unique:true,
    lowercase:true
   },
   password:{
    type:String,
    require:true,
    trim:true, //outerspace
    
   },
 age :{
    type:Number,
    require:true,
    trim:true, //outerspace
    minLength:10,
    maxLength:60
   },
   gender:{
    type:String,
    enum:["male","female"],
    default:"female"
   },
   profileImage:String,
   provider :{
    type:String,
    emum:["system","google"],
    default:"system"
   },
   isConfirmed:{
    type:Boolean,
    defualt:false,

   }
   
},
    {
        timestamps:true,
        strict:true,
        strictQuery:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    })

    const userModel = mongoose.models.User||mongoose.model("User",userSchema)
    export default userModel