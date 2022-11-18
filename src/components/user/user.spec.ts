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

const req = supertest(app);
describe('Test home page', () => {
  it('get home page', async () => {
    const res = await req.get('/');
    expect(res.statusCode).toBe(200);
  });
});
describe('User Testing ', function () {
  describe('Testing the endpoint "user" ', function () {
    beforeEach(async () => {
      // Truncate all the tables in the database
      await Common.dbTruncate();
    });

    const info = {
      firstname: 'faisalTest',
      lastname: 'Altest',
      email: 'test@example.com',
      password: '123123',
    };
    it('Create test account', async function () {
      // status code should be 200
      const res = await supertest(app).post('/user/test').send(info);

      expect(res.statusCode).toBe(200);
    });

    // Failure scenarios
    it('User cannot create same user email twice', async function () {
      // create user first
      const res1 = await supertest(app).post('/user/test').send(info);
      expect(res1.statusCode).toBe(200);

      // create again with same info, will return 404
      const res2 = await supertest(app).post('/user/test').send(info);
      expect(res2.statusCode).toBe(404);
    });
  });
});
