import express from 'express';
import * as productController from './productController';
const productRoutes = express.Router();
productRoutes.get('/', productController.getAllProducts);
productRoutes.get('/:id', productController.getOneProduct);
productRoutes.post('/', productController.createProduct);
productRoutes.patch('/:id', productController.updateOneProduct);
productRoutes.delete('/:id', productController.deleteOneProduct);
export default productRoutes;
