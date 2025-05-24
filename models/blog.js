import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,      // Store image URL or base64 string
  audio: String,      // Store audio URL or base64 string
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Blog', blogSchema);
