import { model, Schema } from "mongoose";

const postSchema = new Schema({
  imgUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true });

const Post = model('Post', postSchema);

export default Post;