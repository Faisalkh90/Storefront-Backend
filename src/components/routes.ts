import express, { Express } from 'express';
import productRouter from './product/productRoutes';
import userRouter1 from './user/userRoutes';
import orderRoutes from './order/orderRoutes';
import orderProductsRoutes from './order-products/order-productsRoutes';
const apiRouter = express.Router();

apiRouter.use('/products', productRouter);
apiRouter.use('/user', userRouter1);
apiRouter.use('/order', orderRoutes);
apiRouter.use('/order-products', orderProductsRoutes);
export default apiRouter;
