import express from 'express';
import * as orderProductsController from './order-productsControllers';
import { tokenAuthorization } from '../../middlewares/authorization';
const orderProductsRoutes = express.Router();
orderProductsRoutes.post('/', orderProductsController.create);
orderProductsRoutes.get('/', orderProductsController.getAllOrderProducts);
orderProductsRoutes.get('/:id', orderProductsController.getOneOrderProduct);
orderProductsRoutes.patch('/:id', orderProductsController.updateOne);
orderProductsRoutes.delete('/:id', orderProductsController.deleteOne);

export default orderProductsRoutes;
