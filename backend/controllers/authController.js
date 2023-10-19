import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret@2023";

const authenticateUser = async (req, res) => {
  try {
    let { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
      attributes: ["iduser", "full_name", "username", "email", "password"],
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", data: "Account does not exist." });
    }

    // return console.log(user);
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        // creating the token
        let token = jwt.sign(
          {
            I: user.iduser,
            f: user.full_name,
            u: user.username,
            e: user.email,
          },
          JWT_SECRET,
          { expiresIn: "1hr" }
        );
        // assigning the token to the cookie
        res.cookie("access-token", token, { maxAge: 60 * 60, httpOnly: true });
        return res.status(200).json({
          token,
        });
      } else {
        return res
          .status(400)
          .json({ status: "error", data: "Incorrect password." });
      }
    }

    return res.status(400).json({
      status: "error",
      data: "Authentication failed! Please check username or password",
    });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
};

export { authenticateUser };
