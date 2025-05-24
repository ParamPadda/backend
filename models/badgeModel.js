import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'yellow-400',
  },
}, { timestamps: true });

export default mongoose.model('Badge', badgeSchema);
