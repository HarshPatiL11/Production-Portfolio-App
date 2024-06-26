import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import PortfolioRoutes from './Routes/PortfolioRoutes.js'
import { connDB } from "./DB/DB.js";
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


//middlewares
app.use(cors())  //cors connects to express
app.use(morgan('dev')) // morgan linking to express  //dev means development mode
app.use(express.json()) // to store data in the database in json format


// static files access
app.use(express.static(path.join(__dirname, "./client/build")));



//Routes
app.use('/api/v1/portfolio',PortfolioRoutes)


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.get('/',(req,res)=>{
    res.send({
        message:"hello Harsh"
        
    })
})
connDB();

app.listen(PORT,()=>{
    console.log(`Listening to port number ${PORT}`.bgGreen.red);
} )

