import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connection = () => {
  const url = process.env.MONGODB_URL;
  console.log(url);
  try {
    mongoose.connect(url);
    console.log("Connection with DB Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
