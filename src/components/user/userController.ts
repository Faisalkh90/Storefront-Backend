import express, { NextFunction, Request, Response } from 'express';
import UserModel from './userModel';
import { config } from '../../../config/sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//hash function to add salt rounds and salt
export function hash(pass: string): string {
  let hashed = bcrypt.hashSync(
    `${pass}${config.salt}`,
    parseInt(config.saltRounds as string)
  );
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
    if (users.length > 0) {
      res.send({
        status: 201,
        message: 'Users retrieved successfully',
        users: users,
      });
    } else {
      res.send({
        status: 201,
        message: 'There are no users',
        users: users,
      });
    }
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
    if (user != null) {
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

export const authenticateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = String(req.query.email);
    const password = String(req.query.password);
    const checkUser = await UserModel.authenticate(email, password);
    if (checkUser) {
      // pass payload and signature that I made in .env
      const userToken = jwt.sign({ checkUser }, String(config.JWT));
      res.send({
        status: 200,
        message: 'User verified successfully',
        //... means Inserting the elements together
        user: { ...checkUser, userToken },
      });
    } else {
      res.send({
        status: 404,
        message: 'Unauthorized user , please try again',
      });
    }
  } catch (e) {
    next(e);
  }
};
