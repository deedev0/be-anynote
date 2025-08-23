import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  fullName: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    select: false,
  },
  image: mongoose.Schema.Types.String,
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserSchema);
