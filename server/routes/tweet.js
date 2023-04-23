import express from "express";
import {
  commentOnTweet,
  deleteTweet,
  getTweets,
  likeTweet,
  postTweet,
  unlikeTweet,
} from "../controller/tweet.js";
import authMiddleware from "../middleware/authMiddleware.js";

const route = express.Router();

route.get("/tweets", authMiddleware, getTweets);
route.post("/tweet", authMiddleware, postTweet);
route.put("/like/:id", authMiddleware, likeTweet);
route.put("/unlike/:id", authMiddleware, unlikeTweet);
route.put("/comment/:id", authMiddleware, commentOnTweet);
route.delete("/:id", authMiddleware, deleteTweet);

export default route;
