import Common from '../../utils/common';
import express, { Request, Response } from 'express';
import OrderProductsModel from './order-productsModel';
import ProductModel from '../product/productModel';

export const create = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderProduct = await OrderProductsModel.createOrderProduct(req.query);
    if (orderProduct) {
      //send the response
      res.send({
        status: 201,
        message: 'Order Product created successfully',
        Item: orderProduct,
      });
    } else {
      res.status(404).send({ message: `Something went wrong ${req.params}` });
    }
  } catch (e) {
    next(e);
  }
};

export const getAllOrderProducts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderProduct = await OrderProductsModel.getAllOrderProducts();
    //check if empty
    if (orderProduct?.length > 0) {
      res.send({
        status: 201,
        message: 'Order product retrieved successfully',
        items: orderProduct,
      });
    } else {
      res.send({
        status: 201,
        message: 'There are no products',
      });
    }
  } catch (e) {
    next(e);
  }
};

export const getOneOrderProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderProduct = await OrderProductsModel.getOneOrderProduct(
      req.params.id
    );
    if (orderProduct) {
      return res.send({
        status: 201,
        message: 'Order product founded',
        item: orderProduct,
      });
    } else {
      return res.send({
        status: 404,
        message: `Cannot found order products id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateOne = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderProduct = await OrderProductsModel.updateOneOrderProduct(
      req.body
    );
    if (orderProduct) {
      return res.send({
        status: 201,
        message: 'Order product updated successfully',
        item: orderProduct,
      });
    } else {
      return res.send({
        status: 404,
        message: `Cannot found order product id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const deleteOne = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const orderProduct = await OrderProductsModel.deleteOrderProduct(
      req.params.id
    );
    if (orderProduct) {
      return res.send({
        status: 201,
        message: 'Order product deleted',
        item: orderProduct,
      });
    } else {
      return res.send({
        status: 404,
        message: `Cannot found order product id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};
