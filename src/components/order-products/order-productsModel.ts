import Common from '../../utils/common';
import db from '../../database';
import { IOrderProducts } from './order-productsType';
import { IProduct } from '../product/productType';

export class OrderProductsModel {
  static table: string = 'order_products';

  //create
  static async createOrderProduct(
    orderProducts: Object
  ): Promise<OrderProductsModel | null> {
    try {
      const sql = await Common.dbInsertion(
        OrderProductsModel.table,
        orderProducts
      );
      //check if exist
      if (sql) {
        return sql.data[0];
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(`Cannot create product ${orderProducts.toString()}`);
    }
  }

  static async getAllOrderProducts(): Promise<IOrderProducts[]> {
    try {
      const selector = ['id', 'quantity', 'order_id', 'product_id'];
      const result = await Common.dbFetch(
        OrderProductsModel.table,
        null,
        selector
      );
      return result as IOrderProducts[];
    } catch (e) {
      throw new Error(`Cannot get all order products from ${this.table}`);
    }
  }

  //get order and products
  static async getOneOrderProduct(id: string): Promise<IOrderProducts | null> {
    try {
      const result = await Common.dbFetch(OrderProductsModel.table, { id });
      if (result?.length) {
        // @ts-ignore
        const id = result[0].product_id;
        const result2 = await Common.dbFetch('product', { id });
        if (result2?.length) {
          const obj = { order: result[0], product: result2[0] };
          return obj as unknown as IOrderProducts;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(`Cannot get id ${id} product from ${this.table}`);
    }
  }

  static async updateOneOrderProduct(
    orderProduct: IOrderProducts
  ): Promise<IOrderProducts> {
    try {
      const conn = await db.connect();
      const sql = `UPDATE order_products SET quantity =$1 , order_id=$2 , product_id =$3 WHERE id = $4 RETURNING *`;
      const values = [
        orderProduct.quantity,
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.id,
      ];
      const result = await db.query(sql, values);

      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Cannot get update order product from : ${this.table}`);
    }
  }

  static async deleteOrderProduct(id: string): Promise<IOrderProducts> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE from order_products WHERE id =$1 RETURNING *';
      const values = [id];
      const result = await db.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Cannot delete order product id : ${id} from table : ${this.table}`
      );
    }
  }
}

export default OrderProductsModel;
