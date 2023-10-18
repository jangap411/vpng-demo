import express from "express";
import { getusers } from "../controllers/usersController.js";
const router = express.Router();

//
router.route("/").get(getusers);

export default router;
