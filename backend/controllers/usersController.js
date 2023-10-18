import User from "../models/User.js";

/**
 * GET get all users function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of users
 */
const getusers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET get sing user function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of user
 */
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        iduser: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/**
 * POST create user function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of user
 */
const createUser = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;

    const user = await user.create({ name, username, password, email });

    if (!user) {
      return res.status(400).json({ message: "Error Creating user" });
    }

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PATCH update user function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of user
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, username } = req.body;

    // check if exists
    const checkUser = await User.findByPk(id);
    if (!checkUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // check password supplied
    const verifyPassword = await bcrypt.compare(
      oldPassword,
      checkUser.password
    );

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Passwords do not match. Please type in the correct passowrds",
      });
    }

    // update user
    const user = await User.update(
      {
        name,
        email,
        password,
        username,
      },
      {
        where: {
          iduser: id,
        },
      }
    );

    // check if update
    if (!user) {
      return res.status(400).json({ message: "Error updating user" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE remote user function
 * @access - authenticated users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns - An array of user
 */

const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const checkUser = await User.findByPk(id);

    if (!checkUser) return res.status(404).json({ message: "User not found." });

    const user = await User.destroy({
      where: {
        iduser: id,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Error Removing User" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getusers, getUser, createUser, updateUser, removeUser };
