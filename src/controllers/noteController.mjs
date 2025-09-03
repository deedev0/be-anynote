import { matchedData } from 'express-validator';
import { Note } from '../mongoose/schemas/notes.mjs';

const createNote = async (req, res) => {
  const data = matchedData(req);
  data.userId = req.session.user._id;

  const newNote = new Note(data);
  try {
    const savedNote = await newNote.save();
    return res.status(201).send(savedNote);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const getAllNotes = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const notes = await Note.find({ userId });
    return res.send(notes)
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user._id;
    const note = await Note.findOne({ _id: id, userId })

    if (!note) return res.status(404).send({ message: 'Note not found'});
    
    return res.send(note);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateNoteById = async (req, res) => {
  try {
    const data = matchedData(req);
    const { id } = req.params;
    const userId = req.session.user._id;
    const updateData = {};
    const note = await Note.findById(id);
    const noteCheck = await Note.findOne({ _id: id, userId });

    if (!note) return res.status(404).send({ message: 'Note not found'});
    if (!noteCheck) return res.status(403).send({ message: 'Forbidden: Note is not yours'});

    if (data.title) updateData.title = data.title;
    if (data.content) updateData.content = data.content;
    if (data.tags) updateData.tags = data.tags;
    if (data.isPinned !== undefined) updateData.isPinned = data.isPinned;
    if (data.isArchived !== undefined) updateData.isArchived = data.isArchived;

    const noteUpdate = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).send({ message: 'Successfully note updated', data: noteUpdate });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user._id;
    const noteCheck = await Note.findOne({ _id: id, userId });
    const note = await Note.findByIdAndDelete(id);

    if (!note) return res.status(404).send({ message: 'Note not found'});
    if (!noteCheck) return res.status(403).send({ message: 'Forbidden: Note is not yours'});

    return res.send({ message: 'Successfully note deleted', note: note.id});
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById };