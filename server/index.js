
import express from 'express';
import orderRoutes from "./routes/orderRoutes.js"
import {dbConnection} from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 
dbConnection(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api' , orderRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server Running on PORT: ${process.env.PORT}`);
});
