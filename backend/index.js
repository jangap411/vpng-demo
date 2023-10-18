import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.PORT || 5500;
const app = express();
import cors from "cors";
// import cookieParser from "cookie-pa";

// routes
import userRoute from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import simRoutes from "./routes/simRoutes.js";

// middlewares
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", [userRoute, customerRoutes, simRoutes]);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Test route" });
});

// start
app.listen(PORT, () => console.log(`\nserver listening on PORT:${PORT}`));
