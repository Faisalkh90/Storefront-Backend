import express from 'express';
import * as orderControllers from './orderControllers';

const orderRoutes = express.Router();
orderRoutes.post('/order', orderControllers.create);
orderRoutes.get('/order/:id', orderControllers.getOne);
orderRoutes.get('/order', orderControllers.getAll);

export default orderRoutes;
