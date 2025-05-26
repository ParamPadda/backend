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
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assuming the user model is named 'User'
    required: false, // Optional field
  },
}, { timestamps: true });

export default mongoose.model('Badge', badgeSchema);
