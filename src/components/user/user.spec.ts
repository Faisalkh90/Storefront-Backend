// import UserModel from './userModel';
// import { IUser } from './user.interfaces';
import Common from '../../utils/common';
// import db from '../../database';
// import supertest from 'supertest';
// import app from '../../../app';
//
// const req = supertest(app);
// describe('Test home page', () => {
//   it('get home page', async () => {
//     const res = await req.get('/');
//     expect(res.statusCode).toBe(200);
//   });
// });
import app from '../../../app';
import supertest from 'supertest';

import { truncateDB } from '../../../spec/utils';
import { IUser } from './user.interfaces';
import UserModel from './userModel';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja1VzZXIiOnsiaWQiOjMzLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJhbHRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMTEtMThUMTQ6MTQ6NDIuMDk0WiJ9LCJpYXQiOjE2Njg3ODA5Mjh9.TgzNeNqpZq8_-zvFQ9HGfeyZabG-GJ6B1O9qOku_QX0';
const req = supertest(app);
describe('Test home page', () => {
  it('get home page', async () => {
    const res = await req.get('/');
    expect(res.statusCode).toBe(200);
  });
});
describe('User Testing ', function () {
  describe('Testing the endpoint "user" ', function () {
    const info = {
      firstname: 'faisalTest',
      lastname: 'Altest',
      email: 'test@example.com',
      password: '123123',
    } as IUser;
    beforeEach(async () => {
      // Truncate all the tables in the database
      await Common.dbTruncate();
    });
    beforeEach(async () => {
      const user = await UserModel.createUser(info);
      if (user != null) info.id = user.id;
    });

    //create end point
    it('Create test account', async function () {
      // status code should be 200
      const res = await req
        .post('/user')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send(info);
      expect(res.statusCode).toBe(200);
    });

    // Failure scenarios
    it('User cannot create same user email twice', async function () {
      const res = await req
        .post('/user')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .send(info);
      // create again with same info, will return 404
      const res2 = await req
        .post('/user')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(400);
    });

    it('get user by id', async function () {
      // get user by id
      const res2 = await req
        .get(`/user/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.user.email).toBe('test@example.com');
    });
    it('nonexistent id', async function () {
      // nonexistent id
      const res2 = await req
        .get('/user/12331')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res2.body.status).toBe(406);
      expect(res2.body.message).toBe('Cannot found id: 12331');
    });

    it('get all users', async function () {
      // get all users
      const res2 = await req
        .get('/user')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res2.body.status).toBe(200);
      expect(Object.keys(res2.body).length).toBe(3);
    });

    it('authenticate user', async function () {
      const res2 = await req
        .post('/user/authenticate')
        .send({ email: info.email, password: info.password } as IUser);
      expect(res2.statusCode).toBe(200);
    });

    it('cannot authenticate user', async function () {
      const res2 = await req
        .post('/user/authenticate')
        .send({ email: 't@gmail.com', password: '123' });
      expect(res2.body.status).toBe(401);
      expect(res2.body.message).toBe('Unauthorized user , please try again');
    });

    it('delete user by id', async function () {
      const res2 = await req
        .delete(`/user/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.user.email).toBe('test@example.com');
    });

    it('unauthorized to delete user', async function () {
      const res2 = await req.delete(`/user/${info.id}`).send(info);
      expect(res2.statusCode).toBe(400);
    });
    it('update user ', async function () {
      const res2 = await req
        .patch(`/user/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: info.id,
          firstname: 'UPDATE',
          lastname: 'Altest',
          email: 'update@example.com',
          password: '123123',
        } as IUser);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.user.email).toBe('update@example.com');
    });
  });
});
