import {hashSync,compareSync} from "bcrypt"

 export const Hash = async (password, SALT_ROUNDS =12)=>{
    return hashSync(password,SALT_ROUNDS)
 }
 
 export const Compare = async (plainText, cipherText)=>{
    return compareSync(plainText,cipherText)
 }