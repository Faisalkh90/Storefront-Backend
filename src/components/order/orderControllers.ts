import express, { Request, Response } from 'express';
import OrdersModel from './orderModel';
import orderModel from './orderModel';
import UserModel from './../user/userModel';

//create order function
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

// get specific order
export const getOne = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orders = await orderModel.getOneOrder(req.params.id);
    if (orders) {
      return res.send({
        status: 201,
        message: 'Order founded',
        item: orders,
      });
    } else {
      return res.send({
        status: 404,
        message: `Cannot found id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const getOneByUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log(req.params.user_id, req.params.id);
    const orders = await orderModel.getOneOrderByUserID(req.params.id);
    if (orders) {
      return res.send({
        status: 201,
        message: 'Order founded',
        item: orders,
        user: await UserModel.getOneUser(req.params.id),
      });
    } else {
      return res.send({
        status: 404,
        message: `Cannot found id: ${req.params.user_id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};

//get all orders
export const getAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orders = await OrdersModel.getAllOrders();
    res.send({
      status: 201,
      message: 'Orders retrieved successfully',
      items: orders,
    });
  } catch (e) {
    next(e);
  }
};
