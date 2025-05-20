import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();


import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT, () => {
    console.log(`User is running on port ${PORT}`);
});
