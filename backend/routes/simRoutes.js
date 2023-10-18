import express from "express";
import {
  createSim,
  getSim,
  getSims,
  removeSim,
  updateSim,
} from "../controllers/simsController.js";
const router = express.Router();

router.route("/sims").get(getSims).post(createSim);
router.route("/sims/:id").get(getSim).patch(updateSim).delete(removeSim);

export default router;
