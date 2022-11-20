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
        status: 200,
        message: 'order created successfully',
        Item: order,
      });
    } else {
      res.status(400).send({
        message: `Something went wrong in the query, please try again`,
      });
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
        status: 200,
        message: 'Order founded',
        item: orders,
      });
    } else {
      return res.send({
        status: 406,
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
    console.log(orders);
    if (orders.length > 0) {
      return res.send({
        status: 200,
        message: 'Order founded',
        item: orders,
        user: await UserModel.getOneUser(req.params.id),
      });
    } else {
      return res.send({
        status: 406,
        message: `Cannot found id: ${req.params.id}`,
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
    if (orders?.length > 0) {
      res.send({
        status: 200,
        message: 'Orders retrieved successfully',
        items: orders,
      });
    } else {
      res.send({
        status: 204,
        message: 'There is no orders',
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateOneOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orders = await OrdersModel.updateOrder(req.body);
    if (orders) {
      res.send({
        status: 200,
        message: 'Orders updated successfully',
        items: orders,
      });
    } else {
      res.send({
        status: 406,
        message: 'Cannot update order',
      });
    }
  } catch (e) {
    next(e);
  }
};

export const deleteOneOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orders = await OrdersModel.deleteOrder(req.params.id);
    if (orders) {
      res.send({
        status: 200,
        message: 'Orders deleted successfully',
        items: orders,
      });
    } else {
      res.send({
        status: 406,
        message: 'Cannot delete order',
      });
    }
  } catch (e) {
    next(e);
  }
};
