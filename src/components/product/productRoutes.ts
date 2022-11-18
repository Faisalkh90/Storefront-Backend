import express from 'express';
import * as productController from './productController';
import { tokenAuthorization } from '../../middlewares/authorization';

const productRoutes = express.Router();
productRoutes.get('/', productController.getAllProducts);
productRoutes.get('/:id', productController.getOneProduct);
productRoutes.post('/', tokenAuthorization, productController.createProduct);
productRoutes.patch(
  '/:id',
  tokenAuthorization,
  productController.updateOneProduct
);
productRoutes.delete(
  '/:id',
  tokenAuthorization,
  productController.deleteOneProduct
);
export default productRoutes;
