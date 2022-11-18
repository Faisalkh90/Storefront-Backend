import jwt from 'jsonwebtoken';
import express from 'express';
import { config } from '../../config/sequelize';

export const tokenAuthorization = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    //get token
    const headerAuth = req.headers['authorization'];
    console.log(headerAuth);
    if (headerAuth) {
      const token = headerAuth.split(' ')[1];
      const verifyToken = jwt.verify(token, String(config.JWT));
      if (verifyToken) {
        next();
      } else {
        throw new Error('Failed to authorized user');
      }
    } else {
      throw new Error('Failed to authorized user');
    }
  } catch (err) {
    const error: Error = new Error('Something went wrong during authorization');
    res.status(401);
    next(error);
  }
};
