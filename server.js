import express from 'express'
import cors from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { UsersRouter } from './src/routes/UsersRoute.js';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.HOST,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use("/auth", UsersRouter)

mongoose.connect(process.env.CONNECTION)

app.listen(process.env.PORT, () =>{
    console.log("Server is running on port:" + process.env.PORT);
})