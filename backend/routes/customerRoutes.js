import express from "express";
import {
  createCustomer,
  getCustomer,
  getCustomers,
  removeCustomer,
  searchCustomer,
  updateCustomer,
} from "../controllers/CustomersController.js";
const router = express.Router();

router.route("/customers").get(getCustomers).post(createCustomer);
router.route("/customers/search").post(searchCustomer);
router
  .route("/customers/:id")
  .get(getCustomer)
  .patch(updateCustomer)
  .delete(removeCustomer);

export default router;
