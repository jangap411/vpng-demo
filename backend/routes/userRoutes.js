import express from "express";
import {
  createUser,
  getUser,
  getusers,
  removeUser,
  updateUser,
} from "../controllers/usersController.js";
const router = express.Router();

//
router.route("/users").get(getusers).post(createUser);
router.route("/users/:id").patch(updateUser).get(getUser).delete(removeUser);

export default router;
