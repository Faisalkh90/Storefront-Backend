import express from 'express';
import * as productController from './productController';
const productRoutes = express.Router();
productRoutes.get('/products', productController.getAllProducts);
productRoutes.get('/products/:id', productController.getOneProduct);
productRoutes.post('/products', productController.createProduct);
export default productRoutes;
