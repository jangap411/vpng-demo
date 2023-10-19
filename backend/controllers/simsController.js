import Sim from "../models/Sim.js";
import Customer from "../models/Customer.js";
import { Sequelize, Op } from "sequelize";

/**
 * GET get all sims function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sims
 */
const getSims = async (req, res) => {
  try {
    const sims = await Sim.findAll();

    res.status(200).json(sims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET get all sim function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sim
 */
const getSim = async (req, res) => {
  try {
    const { id } = req.params;

    const checksim = await Sim.findByPk(id);
    console.log(checksim);

    if (!checksim) {
      return res.status(404).json({ message: "Sim not found" });
    }

    const sim = await Sim.findOne({
      where: {
        idsims: id,
      },
      include: [{ model: Customer }],
    });

    res.status(200).json(sim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST create sim function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sim
 */
const createSim = async (req, res) => {
  try {
    const { number, puk_1, puk_2, serial_no, customer_idcustomer } = req.body;

    console.log(req.body);

    const sim = await Sim.create({
      number,
      puk_1,
      puk_2,
      serial_no,
      customer_idcustomer,
    });

    if (!sim) {
      return res.status(400).json({ message: "Error Creating Sim" });
    }

    res.status(200).json(sim);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST create sim function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sim
 */
const updateSim = async (req, res) => {
  try {
    const { id } = req.params;

    const updateSim = req.body;

    const confirmSim = await Sim.findByPk(id);

    if (!confirmSim) {
      return res.status(404).json({ message: "Error Sim Not Found" });
    }

    // update sim
    const sim = await Sim.update(
      { updateSim },
      {
        where: {
          idsim: id,
        },
      }
    );

    if (!sim) {
      return res.status(400).json({ message: "Error Updating Sim" });
    }

    res.status(200).json({ sim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE remove sim function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sim
 */
const removeSim = async (req, res) => {
  try {
    const { id } = req.params;

    const sim = await Sim.findByPk(id);

    if (!sim) {
      return res.status(404).json({ message: "Sim not found" });
    }

    sim.destroy({
      where: {
        idsim: id,
      },
    });

    if (!sim) {
      return res.status(400).json({ message: "Error while deleting sim" });
    }

    res.status(200).json({ sim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET search sim function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sim
 */
const searchSim = async (req, res) => {
  try {
    const { search } = req.body;

    const sim = await Sim.findAll({
      where: Sequelize.where(
        Sequelize.fn(
          "concat",
          Sequelize.col("idsims"),
          Sequelize.col("number")
        ),
        {
          [Op.like]: "%" + search + "%",
        }
      ),
    });

    res.status(200).json(sim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getSims, getSim, createSim, updateSim, removeSim, searchSim };
