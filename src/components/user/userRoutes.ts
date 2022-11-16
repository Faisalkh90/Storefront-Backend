import express from 'express';
import * as userController from './userController';
import { tokenAuthentication } from './../../middlewares/authentication';
const userRoutes = express.Router();
userRoutes.post('/', userController.create);
userRoutes.get('/',tokenAuthentication, userController.getAll);
userRoutes.get('/:id', userController.getOne);
userRoutes.post('/authenticate', userController.authenticateUser);

export default userRoutes;
