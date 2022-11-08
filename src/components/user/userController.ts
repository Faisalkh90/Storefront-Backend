import express, { NextFunction, Request, Response } from 'express';
import UserModel from './userModel';
import { config } from '../../../config/sequelize';
import bcrypt from 'bcrypt';

//hash function to add salt 10 round and pepper
function hash(pass: string): string {
  let hashed = bcrypt.hashSync(`${pass}${config.pepper}`, bcrypt.genSaltSync());
  return hashed;
}
const user = new UserModel();

//function to create users

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let info: object = {
      firstname: req.query.firstname,
      lastname: req.query.lastname,
      email: req.query.email,
      password: hash(String(req.query.password)),
    };
    const user = await UserModel.createUser(info);
    if (user) {
      //send the response
      res.send({
        status: 201,
        message: 'user created successfully',
        user: user,
      });
    } else {
      res.status(404).send({ message: `Something went wrong ${req.query}` });
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
