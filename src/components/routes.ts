import express, { Express } from 'express';
import productRouter from './product/productRoutes';
import userRouter1 from './user/userRoutes';
import orderRoutes from './order/orderRoutes';
const apiRouter = express.Router();

apiRouter.use('/products', productRouter);
apiRouter.use('/user', userRouter1);
apiRouter.use('/order', orderRoutes);
export default apiRouter;
