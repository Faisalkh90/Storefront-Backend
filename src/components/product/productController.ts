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
    //send the response
    res.send({
      status: 201,
      message: 'Product created successfully',
      Item: product,
    });
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
    res.send({
      status: 201,
      message: 'Products retrieved successfully',
      items: products,
    });
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
        status: 201,
        message: 'Product founded',
        item: product,
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

// export const updateOneProduct = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   try {
//     const product = await ProductModel.updateOneProduct(req.params.id);
//     if (product) {
//       return res.send({
//         status: 201,
//         message: 'Product Updated',
//         item: product,
//       });
//     } else {
//       return res.send({
//         status: 404,
//         message: `Cannot found id: ${req.params.id}`,
//       });
//     }
//   } catch (e) {
//     next(e);
//   }
// };
