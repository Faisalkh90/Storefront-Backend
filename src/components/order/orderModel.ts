import Common from '../../utils/common';
import { IOrder } from './orderType';

export class OrdersModel {
  static table: string = 'orders';

  //create an order
  static async createOrder(order: object): Promise<IOrder | null> {
    try {
      const sql = await Common.dbInsertion(this.table, order);
      //checking
      if (sql) {
        return sql.data[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Cannot create order ${order.toString()}`);
    }
  }

  static async getOneOrder(id: string): Promise<IOrder | null> {
    try {
      const result = await Common.dbFetch(this.table, { id });
      if (result) {
        return result[0] as IOrder;
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(`Cannot get id ${id} order from ${this.table}`);
    }
  }

  //get specific order for the user id
  static async getOneOrderByUserID(user_id: string): Promise<IOrder[]> {
    try {
      const result = await Common.dbFetch(this.table, { user_id });
      return result as IOrder[];
    } catch (e) {
      throw new Error(`Cannot get id ${user_id} order from ${this.table}`);
    }
  }

  static async getAllOrders(): Promise<IOrder[]> {
    try {
      const selector = ['id', 'quantity', 'status', 'user_id'];
      const result = await Common.dbFetch(this.table, null, selector);
      return result as IOrder[];
    } catch (e) {
      throw new Error(`Cannot get all products from ${this.table}`);
    }
  }
}
export default OrdersModel;
