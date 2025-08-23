import { Router } from 'express';

const router = Router();

router.get('/api/notes', (req, res) => {
  return res.status(200).send({ detail: 'all notes'});
});

export default router;
