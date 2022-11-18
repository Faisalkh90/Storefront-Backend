import express from 'express';
import * as userController from './userController';
import { tokenAuthorization } from '../../middlewares/authorization';
const userRoutes = express.Router();
userRoutes.post('/', tokenAuthorization, userController.create);
userRoutes.get('/', tokenAuthorization, userController.getAll);
userRoutes.get('/:id', tokenAuthorization, userController.getOne);
userRoutes.post('/authenticate', userController.authenticateUser);
userRoutes.patch('/:id', tokenAuthorization, userController.updateOne);
userRoutes.delete('/:id', tokenAuthorization, userController.deleteOne);

export default userRoutes;
