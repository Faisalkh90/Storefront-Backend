import express, { NextFunction, Request, Response } from 'express';
import UserModel from './userModel';

const user = new UserModel();

//function to create users

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.createUser(req.query);

    if (user) {
      //send the response
      res.send({
        status: 201,
        message: 'user created successfully',
        user: user,
      });
    } else {
      res.status(404).send({ message: `Something went wrong ${req.params}` });
    }
  } catch (err) {
    next();
  }
};

export const getAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await UserModel.getAllUsers();
    res.send({
      status: 201,
      message: 'Users retrieved successfully',
      users: users,
    });
  } catch (e) {
    next(e);
  }
};

export const getOne = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await UserModel.getOneUser(req.params.id);
    if (user) {
      return res.send({
        status: 201,
        message: 'User founded',
        user: user,
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
