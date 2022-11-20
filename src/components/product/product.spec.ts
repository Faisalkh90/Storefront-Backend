import Common from '../../utils/common';
import db from '../../database';
import supertest from 'supertest';
import app from '../../../app';
import { IProduct } from './productType';
import ProductsModel from './productModel';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVja1VzZXIiOnsiaWQiOjMzLCJmaXJzdG5hbWUiOiJ0ZXN0IiwibGFzdG5hbWUiOiJhbHRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiY3JlYXRlZF9hdCI6IjIwMjItMTEtMThUMTQ6MTQ6NDIuMDk0WiJ9LCJpYXQiOjE2Njg3ODA5Mjh9.TgzNeNqpZq8_-zvFQ9HGfeyZabG-GJ6B1O9qOku_QX0';
const req = supertest(app);

describe('Product Testing ', function () {
  describe('Testing the endpoint "products" ', function () {
    const info = {
      name: 'test product',
      price: 3500,
      description: 'for testing',
    } as IProduct;
    beforeEach(async () => {
      // Truncate all the tables in the database
      await Common.dbTruncate();
    });
    beforeEach(async () => {
      const product = await ProductsModel.createProduct(info);
      if (product != null) {
        // @ts-ignore
        info.id = product.id;
      }
    });

    it('get product by id', async function () {
      // get user by id
      const res2 = await req.get(`/products/${info.id}`).send(info);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.item.name).toBe('test product');
    });
    it('nonexistent id', async function () {
      // nonexistent id
      const res2 = await req
        .get('/products/12331')
        .set('Content-Type', 'application/json');
      expect(res2.body.status).toBe(406);
      expect(res2.body.message).toBe('Cannot found products id: 12331');
    });

    it('get all products', async function () {
      // get all users
      const res2 = await req
        .get('/products')
        .set('Content-Type', 'application/json');
      expect(res2.body.status).toBe(200);
      expect(Object.keys(res2.body).length).toBe(3);
    });

    it('delete product by id', async function () {
      const res2 = await req
        .delete(`/products/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(info);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.item.name).toBe('test product');
    });

    it('unauthorized to delete user', async function () {
      const res2 = await req.delete(`/products/${info.id}`).send(info);
      expect(res2.statusCode).toBe(400);
    });
    it('update products ', async function () {
      const res2 = await req
        .patch(`/products/${info.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: info.id,
          name: 'update product',
          price: 3500,
          description: 'update for testing',
        } as IProduct);
      expect(res2.statusCode).toBe(200);
      expect(res2.body.item.name).toBe('update product');
    });
  });
});
