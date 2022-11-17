import express from 'express';
import * as orderControllers from './orderControllers';

const orderRoutes = express.Router();
orderRoutes.post('/', orderControllers.create);
orderRoutes.get('/', orderControllers.getAll);
orderRoutes.get('/:id', orderControllers.getOne);
orderRoutes.get('/user/:id', orderControllers.getOneByUser);
orderRoutes.patch('/:id', orderControllers.updateOneOrder);
orderRoutes.delete('/:id', orderControllers.deleteOneOrder);

export default orderRoutes;
