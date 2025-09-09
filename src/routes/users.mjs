import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { userValidationSchema, userPatchValidationSchema, validate } from '../middlewares/validators/userValidationSchemas.mjs';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.mjs';
import { checkAuthentication } from '../middlewares/auth/checkAuthentication.mjs';
import { checkAuthorizationUser } from '../middlewares/auth/checkAuthorization.mjs';

const router = Router();

router.post('/api/users', checkSchema(userValidationSchema), validate, createUser);
// router.post('/api/users', upload.single('image'), checkSchema(userValidationSchema), validate, createUser);
router.get('/api/users', getAllUsers);
router.get('/api/users/:id', getUser);
router.patch('/api/users/:id', checkAuthentication, checkAuthorizationUser, checkSchema(userPatchValidationSchema), validate, updateUser);
// router.patch('/api/users/:id', checkAuthentication, checkAuthorizationUser, upload.single('image'), checkSchema(userPatchValidationSchema), validate, updateUser);
router.delete('/api/users/:id', checkAuthentication, checkAuthorizationUser, deleteUser);

export default router;
