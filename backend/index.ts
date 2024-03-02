import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

//import * as jwt from 'jsonwebtoken';
// const current_time = Math.floor(Date.now() / 1000);
// const expiration_time = current_time + 864000; // ten days
// const private_key = 'private_key';
// const claims = {
//     'sub': 'public_key',
//     'exp': expiration_time
// };

// const jwt_token:string = jwt.sign(claims, private_key, { algorithm: 'HS256' });
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())


const uri: string|undefined = process.env.DATABASE_URL ;
if(uri) {
    mongoose.connect(uri);
    //, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    //   } as ConnectOptions)
}
const connection: mongoose.Connection= mongoose.connection;
connection.once("open", ()=>{console.log("MongoDB database connection established successfully")})

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/users", require("./routes/userRoute"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});