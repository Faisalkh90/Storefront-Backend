import Common from '../../utils/common';

export class OrdersModel {
  static table: string = 'orders';

  //create an order
  static async createOrder(order: object): Promise<OrdersModel | null> {
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

  static async getOneOrder(id: string): Promise<Object | undefined> {
    try {
      const result = await Common.dbFetch(this.table, { id });
      if (result != undefined) {
        return result[0];
      }
    } catch (e) {
      throw new Error(`Cannot get id ${id} order from ${this.table}`);
    }
  }

  static async getAllOrders(): Promise<object[]> {
    try {
      const selector = ['id', 'quantity', 'status', 'user_id', 'product_id'];
      const result = await Common.dbFetch(this.table, null, selector);
      // @ts-ignore
      return result;
    } catch (e) {
      throw new Error(`Cannot get all products from ${this.table}`);
    }
  }
}
export default OrdersModel;
