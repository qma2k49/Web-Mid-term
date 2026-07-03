import express from "express";
import connectDB from "./src/configs/db.js";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.route.js";
import postRoutes from "./src/routes/post.route.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/users", userRoutes);
app.use("/posts", postRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
