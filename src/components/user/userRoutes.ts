import express from 'express';
import * as userController from './userController';

const userRoutes = express.Router();
userRoutes.post('/', userController.create);
userRoutes.get('/', userController.getAll);
userRoutes.get('/:id', userController.getOne);

export default userRoutes;
