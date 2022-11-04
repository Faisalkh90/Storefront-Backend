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
}
export default OrdersModel;
