const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// const auth = require( "./middleware/auth");
const app = express();
console.log(process.env.DATABASE_URL)
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL ;
mongoose.connect(uri, {useNewUrlParser:true});
const connection = mongoose.connection;
connection.once("open", ()=>{console.log("MongoDB database connection established successfully")});

// app.use("/notes",auth, require("./routes/notesRoute"));
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })