import Customer from "../models/Customer.js";

/**
 * GET get all customers function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of customer
 */
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET get single customers function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of customer
 */
const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findOne({
      where: {
        idcustomer: id,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST create new customer function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of customer
 */
const createCustomer = async (req, res) => {
  try {
    const newCustomer = req.body;
    const customer = await Customer.create({ newCustomer });

    if (!customer) {
      return res.status(400).json({ message: "Error creating customer" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PATCH update customer function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of customer
 */
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const checkCustomer = await Customer.findByPk(id);

    if (!checkCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // update customer
    const customerInfo = req.body;
    const customer = await Customer.update(
      { customerInfo },
      {
        where: {
          idcustomer: id,
        },
      }
    );

    if (!customer) {
      return res.status(400).json({ message: "Error updating customer" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE remove customer function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of customer
 */
const removeCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const confirmCustomer = await Customer.findByPk(id);

    if (!confirmCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // remove customer
    const customer = await Customer.destroy({
      where: {
        idcustomer: id,
      },
    });

    if (!customer) {
      return res.status(400).json({ message: "Error removing customer" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// TODO: SEARCH CUSTOMERs
/**
 * GET remove customer function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of customer
 */
const searchCustomer = async (req, res) => {
  try {
    res.status(200).json({ message: "Search customer" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  removeCustomer,
  searchCustomer,
};
