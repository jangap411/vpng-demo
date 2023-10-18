import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = async (req, res) => {
  try {
    let { userName, password } = req.body;

    const user = await User.findOne({
      where: { userName },
      attributes: [
        "Id",
        "firstName",
        "lastName",
        "userName",
        "userEmail",
        "password",
        "user_roles_Id",
        "partners_Id",
        "branch_Id",
        "isActive",
        "isDeleted",
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", data: "Account does not exist." });
    }

    if (!user.isActive) {
      return res
        .status(403)
        .json({ status: "warning", data: "Your account has been disabled" });
    }

    // return console.log(user);
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        // creating the token
        let token = jwt.sign(
          {
            I: user.Id,
            f: user.firstName,
            l: user.lastName,
            u: user.userName,
            e: user.userEmail,
            r: user.user_roles_Id,
            p: user.partners_Id,
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
