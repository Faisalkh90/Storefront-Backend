import express from 'express';
import * as orderControllers from './orderControllers';

const orderRoutes = express.Router();
orderRoutes.post('/order', orderControllers.create);

export default orderRoutes;
