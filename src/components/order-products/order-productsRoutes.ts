import express from 'express';
import * as orderProductsController from './order-productsControllers';
import { tokenAuthorization } from '../../middlewares/authorization';
const orderProductsRoutes = express.Router();
orderProductsRoutes.post(
  '/',
  tokenAuthorization,
  orderProductsController.create
);
orderProductsRoutes.get(
  '/',
  tokenAuthorization,
  orderProductsController.getAllOrderProducts
);
orderProductsRoutes.get(
  '/:id',
  tokenAuthorization,
  orderProductsController.getOneOrderProduct
);
orderProductsRoutes.patch(
  '/:id',
  tokenAuthorization,
  orderProductsController.updateOne
);
orderProductsRoutes.delete(
  '/:id',
  tokenAuthorization,
  orderProductsController.deleteOne
);

export default orderProductsRoutes;
