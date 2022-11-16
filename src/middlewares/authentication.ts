import jwt from 'jsonwebtoken';
import express from 'express';
import { config } from '../../config/sequelize';

export const tokenAuthentication = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    //get token
    const headerAuth = req.headers['authorization'];
    if (headerAuth) {
      const token = headerAuth.split(' ')[1];
      const verifyToken = jwt.verify(token, String(config.JWT));
      if (verifyToken) {
        next();
      } else {
        throw new Error('Failed to authenticate user');
      }
    } else {
      throw new Error('Failed to authenticate user');
    }
  } catch (err) {
    const error: Error = new Error(
      'Something went wrong during authentication'
    );
    res.status(401);
    next(error);
  }
};
