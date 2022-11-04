import express from 'express';
import * as userController from './userController';

const userRoutes = express.Router();
userRoutes.post('/userc', userController.create);
userRoutes.get('/userc', userController.getAll);
userRoutes.get('/userc/:id', userController.getOne);

export default userRoutes;
