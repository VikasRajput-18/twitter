import userModel from "../model/User.js";
import tweetModal from "../model/Tweet.js";

const postTweet = async (req, res) => {
  const { text, image } = req.body;

  try {
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }
    // Create a new tweet with the logged in user's ID
    const newTweet = new tweetModal({
      user: req.user.userId,
      text,
      image: image,
    });

    await newTweet.save();
    res.status(201).json({ message: "Tweeted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTweets = async (req, res) => {
  try {
    const tweets = await tweetModal
      .find()
      .populate({ path: "user", select: "name username profilePic" })
      .populate({
        path: "comments.user",
        select: "name username profilePic",
      })
      .lean()
      .exec();

    if (tweets) {
      let tweetsWithUserInfo = await Promise.all(
        tweets.map(async (tweet) => {
          const liked = tweet.likes.includes(req.user.userId);
          return { ...tweet, liked };
        })
      );
      res.status(200).send({ result: tweetsWithUserInfo });
    } else {
      res.status(401).send({ message: "Error while fetching tweets" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user.userId;
    const tweet = await tweetModal.findById(tweetId);
    // const tweet = await tweetModal.findByIdAndUpdate(
    //   tweetId,
    //   {
    //     $addToSet: { likes: userId },
    //   },
    //   { new: true }
    // );
    if (!tweet) {
      res.status(404).send({ message: "Tweet not found" });
    }
    if (tweet.likes.includes(userId)) {
      res.status(400).send({ message: "Tweet already liked" });
    }
    tweet.likes.push(userId);
    await tweet.save();
    res.status(200).send({ message: "Tweet liked successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
const unlikeTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user.userId;
    const tweet = await tweetModal.findById(tweetId);
    // const tweet = await tweetModal.findByIdAndUpdate(
    //   tweetId,
    //   {
    //     $pull: { likes: userId },
    //   },
    //   { new: true }
    // );

    if (!tweet) {
      res.status(404).send({ message: "Tweet not found" });
    }
    if (!tweet.likes.includes(userId)) {
      res.status(400).send({ message: "Tweet not liked yet" });
    }
    tweet.likes = tweet?.likes?.filter((id) => id != userId);
    await tweet.save();
    res.status(200).send({ message: "Tweet unliked successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

const commentOnTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.user.userId;
    const { commentText } = req.body;
    const tweet = await tweetModal.findById(tweetId);
    const user = await userModel.findById(userId);
    if (!tweet) {
      res.status(404).send({ message: "Tweet Not Found" });
    }
    if (!user) {
      res.status(404).send({ message: "User Not Found" });
    }

    const newComment = {
      user: user._id,
      text: commentText,
    };
    tweet.comments.unshift(newComment);
    await tweet.save();

    const populatedTweet = await tweetModal
      .findById(tweetId)
      .populate({
        path: "user",
        select: "username name profilePic",
      })
      .populate({
        path: "comments.user",
        select: "username name profilePic",
      });
    res.status(200).send({ message: "Comment Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await tweetModal.findById(tweetId);

    if (!tweet) {
      res.status(404).send({ message: "Tweet not found" });
      return;
    }

    if (tweet.user.toString() !== req.user.userId) {
      res.status(401).send({ message: "Not authorized to delete this tweet" });
      return;
    }
    await tweetModal.deleteOne({ _id: tweetId });
    res.status(200).send({ message: "Tweet deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

export {
  postTweet,
  getTweets,
  likeTweet,
  unlikeTweet,
  commentOnTweet,
  deleteTweet,
};
