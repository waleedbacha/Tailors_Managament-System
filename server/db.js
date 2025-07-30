import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


export const dbConnection = async() => {
try {
    await mongoose.connect(process.env.DB_URI, {
        dbName : process.env.DB_NAME
    });
    console.log("Database Connected Successfully");
} catch (err) {
    console.log("Mongoose connection Failed!" , err.message);
}

}