import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://img.freepik.com/free-icon/user_318-804790.jpg",
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
