import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  loveCount: {
    type: [String],
    default: [],
  },
  timeCreated: {
    type: Date,
    default: new Date(),
  },
});

const PostNote = mongoose.model("PostNote", postSchema);

export default PostNote;
