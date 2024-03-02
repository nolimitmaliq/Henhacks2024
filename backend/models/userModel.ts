import { Schema, model,Types} from "mongoose";

export interface IUser {
    _id: Types.ObjectId,
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profilePicUrl: string;
}

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        //must be unique
    },
    password:{
        type: String,
        required: true,
        //must be 8 characters long
    },
    email:{
        type: String,
        required: false,
        //must be an email and unique
    },
    firstName:{
        type: String,
        required: false,
        //must be all characters
    },
    lastName:{
        type: String,
        required: false,
        //must be all characters
    },
    profilePicUrl:{
        type: String,
        required: false,
        //must be pingable
        //or must be a https link
    }
});

const User = model<IUser>("User", userSchema);
export default User;

