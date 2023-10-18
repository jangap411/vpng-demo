import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.PORT || 5500;
const app = express();

// routes
import userRoute from "./routes/userRoutes.js";

app.use("/api/v1", [userRoute]);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "success" });
});

// start
app.listen(PORT, () => console.log(`\nserver listening on PORT:${PORT}`));
