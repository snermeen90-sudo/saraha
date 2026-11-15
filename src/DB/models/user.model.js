import mongoose from "mongoose"
import {ProviderEnum,GenderEnum,RoleEnum} from "../../common/enum/user.enum.js"
const userSchema = new mongoose.Schema(
    {
       fName:{
        type: String,
        required: true, // التصحيح: required وليست require
        trim: true,
        minLength: 2,
        maxLength: 8
       },
       lName:{
        type: String,
        required: true, // التصحيح: required وليست require
        trim: true,
        minLength: 2,
        maxLength: 8
       },
       email:{
        type: String,
        required: true, // التصحيح: required وليست require
        trim: true,
        unique: true,
        lowercase: true
       },
       password:{
        type: String,
        required: function(){ // التصحيح: required وليست require
            return this.provider == ProviderEnum.system ? true : false
        },
        trim: true,
       },
       age: {
        type: Number,
        required: function(){ // التصحيح: required وليست require وإغلاق الأقواس بشكل صحيح
            return this.provider == ProviderEnum.system ? true : false
        },
        min: 10,  // للأرقام نستخدم min و max وليست minLength و maxLength
        max: 60
       },
       gender:{
        type: String,
        enum: Object.values(GenderEnum), //[male,female]
        default: GenderEnum.female
       },
       profileImage: String,
       phone: String,
       provider: {
        type: String,
        enum: Object.values(ProviderEnum), 
        default:ProviderEnum.system
       }, role: {
        type: String,
        enum:Object.values(RoleEnum), 
        default:RoleEnum.user
       },
       isConfirmed:{
        type: Boolean,
        default: false, 
       }
    },
    {
        timestamps: true,
        strict: true,
        strictQuery: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

const userModel = mongoose.models.User || mongoose.model("User", userSchema)
export default userModel