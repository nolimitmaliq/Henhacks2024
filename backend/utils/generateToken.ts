import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {IUser} from "../models/userModel";
dotenv.config();

export async function generateToken(user:IUser){
    return new Promise((resolve, reject)=>{
        jwt.sign({
            username:user.userName,
            user: user._id
        },process.env.JWT_SECRET as jwt.Secret,(err:any, token:any)=>{
            if(err){
                reject(err);
            }
            resolve(token);
        })
    })
}

module.exports = generateToken;