import ConnectionDB from './DB/connectionDB.js'
import express from 'express'
import userRouter from './DB/modules/users/user.controller.js'
const app =express()
const port =3000


const bootstrap = async ()=>{
     app.use(express.json())
     await ConnectionDB()
     app.get("/",(req,res)=>res.status(201).json({message:"welcome to saraha"}))
 
    app.use("/users",userRouter)
     app.use("/*demo",(req,res,next)=>{
       throw new Error(`url${req.originalUrl} with method:${req.method}not found`,{cause:404})
     })

     app.use((err, req, res, next) => {
     console.log(err);
     res.status(err.cause|| 500).json({message:err.message , stack:err.stack})
     });
     app.listen(port,()=>console.log(`example app listening on port ${port}`) )
}

export default bootstrap