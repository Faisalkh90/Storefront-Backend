import app from '../../../app';
import supertest from 'supertest';
import Common from '../../utils/common';
import { IOrderProducts } from './order-productsType';
import OrderProductsModel from './order-productsModel';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja1VzZXIiOnsiaWQiOjMzLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJhbHRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMTEtMThUMTQ6MTQ6NDIuMDk0WiJ9LCJpYXQiOjE2Njg3ODA5Mjh9.TgzNeNqpZq8_-zvFQ9HGfeyZabG-GJ6B1O9qOku_QX0';
const req = supertest(app);
describe('User Testing ', function () {
  describe('Testing the endpoint "order-products" ', function () {
    const info = {
      quantity: 3,
      order_id: 1,
      product_id: 1,
    } as IOrderProducts;
    beforeEach(async () => {
      // Truncate all the tables in the database
      await Common.dbTruncate();
    });
    beforeEach(async () => {
      const orderProducts = await OrderProductsModel.createOrderProduct(info);
      if (orderProducts != null) {
        // @ts-ignore
        info.id = orderProducts.id;
      }
    });

    it('get orderProducts by id', async function () {
      // get user by id
      const res2 = await req
        .get(`/order-products/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(200);
      console.log(res2.body);
    });
    it('nonexistent id', async function () {
      // nonexistent id
      const res2 = await req
        .get('/order-products/12331')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res2.body.status).toBe(406);
      expect(res2.body.message).toBe('Cannot found order products id: 12331');
    });

    it('get all order products', async function () {
      // get all users
      const res2 = await req
        .get('/order-products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res2.body.status).toBe(204);
      expect(Object.keys(res2.body).length).toBe(2);
    });

    it('delete order products by id', async function () {
      const res2 = await req
        .delete(`/order-products/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(400);
      // expect(res2.body.user.email).toBe('test@example.com');
    });

    it('unauthorized to delete order products', async function () {
      const res2 = await req.delete(`/order-products/${info.id}`).send(info);
      expect(res2.statusCode).toBe(400);
    });
    it('update order products ', async function () {
      const res2 = await req
        .patch(`/order-products/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: info.id,
          quantity: 4,
          order_id: 1,
          product_id: 1,
        } as IOrderProducts);
      expect(res2.statusCode).toBe(200);
      // expect(res2.body.user.email).toBe('update@example.com');
    });
  });
});
