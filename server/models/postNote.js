import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  username: String,
  creator: String,
  loveCount: {
    type: [String],
    default: [],
  },
  timeCreated: {
    type: Date,
    default: new Date(),
  },
  avatar: String,
});

const PostNote = mongoose.model("PostNote", postSchema);

export default PostNote;
