import dotenv from "dotenv";
dotenv.config();
import express from "express";
const PORT = process.env.PORT || 5500;
const app = express();

// routes
import userRoute from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

app.use("/api/v1", [userRoute, customerRoutes]);

app.get("/", (req, res) => {
  res.status(200).json({ status: "OK", message: "Test route" });
});

// start
app.listen(PORT, () => console.log(`\nserver listening on PORT:${PORT}`));
