import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { UserModel } from '../models/Users.js'
dotenv.config();
const router = express.Router();


router.post("/register", async (req,res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(user){
        return res.json({ message: "User already exist!"});
    }

    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
    const newUser = new UserModel({username, password: hashPassword});
    await newUser.save();

    res.json({message: "User Successfuly Registered!"});
})

router.post("/login", async (req,res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({ message: "User doesn't exist!"});
    }

    const isValidatePassword = await bcrypt.compare(password,user.password);

    if(!isValidatePassword){
        return res.json({ message: "Username or password is incorrect!"});
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY);
    res.json({token, userID: user._id});

})

export {router as UsersRouter} 