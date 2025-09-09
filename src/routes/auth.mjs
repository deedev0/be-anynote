import { Router } from 'express';
import { User } from '../mongoose/schemas/user.mjs';
import { comparePassword } from '../utils/helpers.mjs';
import { checkAuthentication } from '../middlewares/auth/checkAuthentication.mjs';

const router = Router();

router.post('/api/auth', async (req, res) => {
  const { body: { username, password }} = req;

  const findUser = await User.findOne({ username }).select('+password');
  if (!findUser || !comparePassword(password,  findUser.password)) return res.status(401).send({ message: 'Bad Credentials'});

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

router.get('/api/auth/status', checkAuthentication, (req, res) => {return res.status(200).send({ message: 'Authenticated', data: req.session.user })});

router.post('/api/auth/logout', checkAuthentication, (req, res) => {
  req.logout(err => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

export default router;
