import Common from '../../utils/common';
import db from '../../database';
import supertest from 'supertest';
import app from '../../../app';
import { IOrder } from './orderType';
import OrdersModel from './orderModel';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja1VzZXIiOnsiaWQiOjMzLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJhbHRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMTEtMThUMTQ6MTQ6NDIuMDk0WiJ9LCJpYXQiOjE2Njg3ODA5Mjh9.TgzNeNqpZq8_-zvFQ9HGfeyZabG-GJ6B1O9qOku_QX0';
const req = supertest(app);

describe('User Testing ', function () {
  describe('Testing the endpoint "order" ', function () {
    const info = {
      quantity: 3,
      status: 'test',
      user_id: 1,
    } as IOrder;
    beforeEach(async () => {
      // Truncate all the tables in the database
      await Common.dbTruncate();
    });
    beforeEach(async () => {
      const order = await OrdersModel.createOrder(info);
      if (order != null) info.id = order.id;
    });

    it('get order by id', async function () {
      // get user by id
      const res2 = await req
        .get(`/order/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(200);
      // expect(res2.body.item.id).toBe(info.id);
      // console.log(res2.body.item.id);
    });
    it('nonexistent id', async function () {
      // nonexistent id
      const res2 = await req
        .get('/order/12331')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res2.body.status).toBe(406);
      expect(res2.body.message).toBe('Cannot found id: 12331');
    });

    it('get all orders', async function () {
      // get all users
      const res2 = await req
        .get('/order')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res2.body.status).toBe(200);
      expect(Object.keys(res2.body).length).toBe(3);
    });

    it('delete order by id', async function () {
      const res2 = await req
        .delete(`/order/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(200);
      // expect(res2.body.item.id).toBe(info.id);
    });

    it('unauthorized to delete order', async function () {
      const res2 = await req.delete(`/order/${info.id}`).send(info);
      expect(res2.statusCode).toBe(400);
    });
    it('update order ', async function () {
      const res2 = await req
        .patch(`/order/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: info.id,
          quantity: 4,
          status: 'updated',
          user_id: 1,
        } as IOrder);
      expect(res2.statusCode).toBe(200);
      // expect(res2.body.item.quantity).toBe(4);
    });
  });
});
