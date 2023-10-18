import Sim from "../models/Sim.js";

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

    res.status(200).json({ sims });
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
    const { id } = req.body;

    const sim = await Sim.findByPk(id);

    if (!sim) {
      return res.status(404).json({ message: "Sim not found" });
    }

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
    const { number, puk_1, puk_2, serial_no, idcustomer } = req.body;

    const sim = await Sim.create({
      number,
      puk_1,
      puk_2,
      serial_no,
      idcustomer,
    });

    if (!sim) {
      return res.status(400).json({ message: "Error Creating Sim" });
    }

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

// TODO: search sim function
/**
 * GET search sim function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of sim
 */
const searchSim = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Search sim function to be completed soon" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getSims, getSim, createSim, updateSim, removeSim };
