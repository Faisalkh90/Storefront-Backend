import express, { Express } from 'express';
import userRouter from './user/user.routes';
import productRouter from './product/productRoutes';
import userRouter1 from './user/userRoutes';
import orderRoutes from './order/orderRoutes';
const apiRouter = express.Router();

apiRouter.use(userRouter);
apiRouter.use(productRouter);
apiRouter.use(userRouter1);
apiRouter.use(orderRoutes);
export default apiRouter;
