import express from "express";
import { userSignIn, userSignUp } from "../controller/auth.js";

const route = express.Router();

route.post("/signin", userSignIn);
route.post("/signup", userSignUp);

export default route;
