import Common from '../../utils/common';
import { createProduct, product, productSerialized } from './productInterface';

export class Product {
  static table: string = 'product';

  //create product
  async createProduct(
    product: createProduct
  ): Promise<productSerialized | null> {
    const sql = await Common.dbInsertion(Product.table, product);
    if (sql && sql.inserted) {
      return sql.data[0] as productSerialized;
    } else {
      return null;
    }
  }
}
