import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  tags: {
    type: mongoose.Schema.Types.Array,
    required: true,
  },
  isPinned: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  isArchived: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Note = mongoose.model('Note', NoteSchema);
