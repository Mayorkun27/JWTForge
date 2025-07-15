import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./dB/connect.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config();
connectDb();

const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({ extended : false }));

app.use("/", express.static(path.join(process.cwd(), "/public")))

app.use("/api/v1/user", userRouter)

const PORT = process.env.PORT || 2001;
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
})