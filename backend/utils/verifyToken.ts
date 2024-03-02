import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

//checking if token is altered or not
async function verifyToken(payload:string){
    return new Promise((resolve, reject)=>{
        jwt.verify(payload, process.env.JWT_SECRET as jwt.Secret, (err, decoded)=>{
            if(err){
                reject(err);
            }
            resolve(decoded);
        })
    })
}

module.exports = verifyToken;