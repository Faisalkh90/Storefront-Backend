import express, { Request, Response } from 'express';
import ProductModel from './productModel';

const productsModel = new ProductModel();

//function will create a product when access an end point
export const createProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await ProductModel.createProduct(req.query);
    if (product) {
      //send the response
      res.send({
        status: 200,
        message: 'Product created successfully',
        Item: product,
      });
    } else {
      res.status(400).send({ message: `Something went wrong ${req.params}` });
    }
  } catch (e) {
    next(e);
  }
};

export const getAllProducts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const products = await ProductModel.getAllProducts();
    //check if empty
    if (products?.length > 0) {
      res.send({
        status: 200,
        message: 'Products retrieved successfully',
        items: products,
      });
    } else {
      res.send({
        status: 204,
        message: 'There are no products',
      });
    }
  } catch (e) {
    next(e);
  }
};

export const getOneProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await ProductModel.getOneProduct(req.params.id);
    if (product) {
      return res.send({
        status: 200,
        message: 'Product founded',
        item: product,
      });
    } else {
      return res.send({
        status: 406,
        message: `Cannot found products id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateOneProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await ProductModel.updateOneProduct(req.body);
    if (product) {
      return res.send({
        status: 200,
        message: 'Product Updated',
        item: product,
      });
    } else {
      return res.send({
        status: 406,
        message: `Cannot found product id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};

export const deleteOneProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await ProductModel.deleteProduct(req.params.id);
    if (product) {
      return res.send({
        status: 200,
        message: 'Product deleted',
        item: product,
      });
    } else {
      return res.send({
        status: 406,
        message: `Cannot found product id: ${req.params.id}`,
      });
    }
  } catch (e) {
    next(e);
  }
};
