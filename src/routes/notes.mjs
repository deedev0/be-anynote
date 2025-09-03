import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { notePatchValidationSchema, noteValidate, noteValidationSchema } from '../middlewares/validators/noteValidationSchemas.mjs';
import { checkAuthentication } from '../middlewares/auth/checkAuthentication.mjs';
import { createNote, getAllNotes, getNoteById, updateNoteById } from '../controllers/noteController.mjs';

const router = Router();

router.post('/api/notes', checkAuthentication, checkSchema(noteValidationSchema), noteValidate, createNote);

router.get('/api/notes', checkAuthentication, getAllNotes);

router.get('/api/notes/:id', checkAuthentication, getNoteById);

router.patch('/api/notes/:id', checkAuthentication, checkSchema(notePatchValidationSchema), noteValidate, updateNoteById);

export default router;
