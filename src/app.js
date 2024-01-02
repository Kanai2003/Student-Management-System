import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

// import routes
import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/student.routes.js";

// routes declaration
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);


export {app};