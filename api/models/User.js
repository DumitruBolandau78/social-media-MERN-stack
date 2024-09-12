import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    default: '/images/user.png'
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true
});

const User = model('User', userSchema);

export default User;