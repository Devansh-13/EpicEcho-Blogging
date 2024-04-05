import express from "express";
import Connection from "./database/db.js"
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";


dotenv.config();
const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",Router);

const pass=process.env.DB_NAME;
const dbName=process.env.DB_PASS;

Connection(dbName,pass);



const PORT=1400;
app.listen(PORT,()=>{
    console.log(`-------------- Server is Running at ${PORT} --------------`);
});
