import React from "react";

const CommentBox = ({ comment }) => {
  return (
    <div className=" p-4 bg-[#202327] rounded-lg border-b border-b-gray-700">
      <div className="flex items-center gap-4">
        <img
          src={comment?.user.profilePic}
          className="w-12 h-12 rounded-full object-cover"
          alt={comment?.user.name}
        />
        <p className="text-xl text-white font-bold">{comment?.user.name}</p>
      </div>
      <div className="text-xl text-white pl-16">{comment?.text}</div>
    </div>
  );
};

export default CommentBox;
