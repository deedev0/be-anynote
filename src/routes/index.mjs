import { Router } from 'express';
import usersRouter from './users.mjs';
import notesRouter from './notes.mjs';
import authsRouter from './auth.mjs';

const router = Router();

router.use(usersRouter);
router.use(authsRouter);
router.use(notesRouter);

export default router;
