import UserModel from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await UserModel.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // generate a jwt token
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
          });
          const userInfo = {
            _id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
            profilePic: user.profilePic,
            token,
          };
          res
            .status(200)
            .send({ userInfo, message: "User successfully login" });
        } else {
          res.status(401).send({ message: "Invalid Credentials" });
        }
      } else {
        res.status(409).send({
          message: "User is not registered! Please create your account",
        });
      }
    } else {
      res.status(401).send({ message: "Please fill all the fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

const userSignUp = async (req, res) => {
  const { username, name, email, password, profilePic } = req.body;
  try {
    if (username && name && email && password) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          username,
          name,
          email,
          password: hashedPassword,
          profilePic,
        });

        await newUser.save();
        res.status(200).send({ message: "User account created successfully" });
      } else {
        res
          .status(409)
          .send({ message: "User with this email already exists" });
      }
    } else {
      res.status(401).send({ message: "Please fill all the fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server error" });
  }
};

export { userSignIn, userSignUp };
