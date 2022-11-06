import express from 'express';
import * as orderControllers from './orderControllers';

const orderRoutes = express.Router();
orderRoutes.post('/order', orderControllers.create);
orderRoutes.get('/order', orderControllers.getAll);
orderRoutes.get('/order/:id', orderControllers.getOne);
orderRoutes.get('/:user_id', orderControllers.getOneByUser);

export default orderRoutes;
