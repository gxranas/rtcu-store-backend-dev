import express from 'express'
import cors from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { UsersRouter } from './src/routes/UsersRoute.js';
dotenv.config();

mongoose.connect(process.env.CONNECTION)
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", UsersRouter)


app.listen(process.env.PORT, () =>{
    console.log("Server is running on port:" + process.env.PORT);
})