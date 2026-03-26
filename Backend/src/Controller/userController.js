import asyncHandler from "express-async-handler";
import { hashPassword } from "../utils/hashPassword.js";
import User from "../Model/UserModel.js"
import generateToken from "../utils/generateToken.js";

import { comparePassword } from "../utils/hashPassword.js";
  export const registerUser = asyncHandler(async(req ,res)=>{
    const {name , email ,password}= req.body 
const userExists = await User.findOne({email});
if(userExists){
    res.status(400)
    throw new Error("user alredy exist");
}
const  hashedPassword = await hashPassword(password)



 const user = await User.create({
    name ,
    email,
    password:hashedPassword,
 })
 if (user){
    res.status(201).json({
        _id:user._id ,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
 }else{
    res.status(400);
    throw new Error("Invalid user data")
 }})

  


  export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await comparePassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

   export const getme = asyncHandler( async(req,res)=>{
    const  user =  await User.findById(req.user._id)
    if (user){
        res.json({
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        }
        )
    }else{
        res.status(401)
        throw new Error("user is not  exist with this id")
    }
   })



