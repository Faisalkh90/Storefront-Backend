import express from 'express';
import * as orderControllers from './orderControllers';
import { tokenAuthorization } from '../../middlewares/authorization';

const orderRoutes = express.Router();
orderRoutes.post('/', tokenAuthorization, orderControllers.create);
orderRoutes.get('/', tokenAuthorization, orderControllers.getAll);
orderRoutes.get('/:id', tokenAuthorization, orderControllers.getOne);
orderRoutes.get('/user/:id', tokenAuthorization, orderControllers.getOneByUser);
orderRoutes.patch('/:id', tokenAuthorization, orderControllers.updateOneOrder);
orderRoutes.delete('/:id', tokenAuthorization, orderControllers.deleteOneOrder);

export default orderRoutes;
