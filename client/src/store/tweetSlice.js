import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    allTweets: [],
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.allTweets = [...action.payload];
    },

    updateTweet: (state, action) => {
      const updatedTweets = action.payload;
      state.allTweets = state.allTweets.map((tweet) => {
        const updatedTweet = updatedTweets.find((t) => t._id === tweet._id);
        return updatedTweet ? updatedTweet : tweet;
      });
    },
  },
});

export const { getAllTweets, updateTweet } = tweetSlice.actions;
export default tweetSlice.reducer;
