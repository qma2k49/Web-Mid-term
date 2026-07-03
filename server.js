import express from "express";
import connectDB from "./src/configs/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
