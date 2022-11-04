import express, { Request, Response } from 'express';
import OrdersModel from './orderModel';

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const order = await OrdersModel.createOrder(req.query);
    if (order) {
      //send the response
      res.send({
        status: 201,
        message: 'order created successfully',
        Item: order,
      });
    } else {
      res.status(404).send({ message: `Something went wrong ${req.params}` });
    }
  } catch (e) {
    next(e);
  }
};
