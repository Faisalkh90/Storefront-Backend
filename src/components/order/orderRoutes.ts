import express from 'express';
import * as orderControllers from './orderControllers';

const orderRoutes = express.Router();
orderRoutes.post('/', orderControllers.create);
orderRoutes.get('/', orderControllers.getAll);
orderRoutes.get('/:id', orderControllers.getOne);
orderRoutes.get('/order/:id', orderControllers.getOneByUser);

export default orderRoutes;
