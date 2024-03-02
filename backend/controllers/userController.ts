import User, {IUser} from '../models/userModel';
import bcrypt from 'bcrypt';
import {generateToken} from '../utils/generateToken';
import {Request,Response} from "express";

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
  }

  export async function signUpHandler(req:Request, res:Response) {

    try{
        
        const newuser:IUser = req.body as unknown as IUser;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newuser.password, salt);

        await User.create({
            userName:newuser.userName,
            password:hashedPassword,
            email:newuser.email,
            firstName:newuser.firstName,
            lastName:newuser.lastName,
            profilePicUrl:newuser.profilePicUrl
        });
        
        return res.status(201).send({message:"User created successfully"});
    } catch(err){
        console.log(err);
        console.log(getErrorMessage(err));
        return res.status(500).json({message:getErrorMessage(err), stuff:req.body});
    }
}

export async function loginHandler(req:Request, res:Response) {
    try{
        const loggedInuser:IUser = req.body as unknown as IUser;
        const useRecord:IUser =await User.findOne({username:loggedInuser.userName}) as IUser;

        if (await bcrypt.compare(loggedInuser.password, useRecord.password) === false){
            return res.status(401).json({message:"Invalid username or password"});
        }
        else{
            const token = await generateToken(useRecord);
            return res.status(200).send({token:token})
        }
    }
    catch(err){
        console.log(err);
        console.log(getErrorMessage(err));
        return res.status(500).send({message:getErrorMessage(err)})
    }
}
export async function getAllUsersHandler(req:Request, res:Response){
    try{
        const users = await User.find();
        return res.json(users);
    }catch(err){
        return res.json({message:getErrorMessage(err)});
    }
}


module.exports = {
    signUpHandler,
    loginHandler,
    getAllUsersHandler
}