import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { userValidationSchema, userPatchValidationSchema, validate } from '../middlewares/validators/userValidationSchemas.mjs';
import { upload } from '../middlewares/upload.mjs';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.mjs';

const router = Router();

router.post('/api/users', upload.single('image'), checkSchema(userValidationSchema), validate, createUser);
router.get('/api/users', getAllUsers);
router.get('/api/users/:id', getUser);
router.patch('/api/users/:id', upload.single('image'), checkSchema(userPatchValidationSchema), validate, updateUser);
router.delete('/api/users/:id', deleteUser);

export default router;
