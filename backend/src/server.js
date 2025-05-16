import dotenv from "dotenv";
import path from "path";

dotenv.config();


import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`User is running on port ${PORT}`);
});
