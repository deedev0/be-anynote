import { Router } from 'express';
import usersRouter from './users.mjs';
import notesRouter from './notes.mjs';

const router = Router();

router.use(usersRouter);
router.use(notesRouter);

export default router;
