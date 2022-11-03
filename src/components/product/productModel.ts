import Common from '../../utils/common';
import { IProduct } from './productType';
export class ProductsModel {
  static table: string = 'product';

  //create product
  static async createProduct(product: Object): Promise<ProductsModel | null> {
    try {
      const sql = await Common.dbInsertion(ProductsModel.table, product);
      //check if exist
      if (sql) {
        return sql.data[0];
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(`Cannot create product ${product.toString()}`);
    }
  }

  //display all products
  static async getAllProducts(): Promise<IProduct[]> {
    try {
      const selector = ['id', 'name', 'price'];
      const result = await Common.dbFetch(ProductsModel.table, null, selector);
      return result as IProduct[];
    } catch (e) {
      throw new Error(`Cannot get all products from ${this.table}`);
    }
  }

  //get one specific product by id
  static async getOneProduct(id: string): Promise<object | undefined> {
    try {
      const result = await Common.dbFetch(ProductsModel.table, { id });
      if (result != undefined) {
        return result[0];
      }
    } catch (e) {
      throw new Error(`Cannot get id ${id} product from ${this.table}`);
    }
  }

  // static async updateOneProduct(id: string): Promise<IProduct[]> {
  //   try {
  //     const selector = ['id', 'name', 'price'];
  //     const result = await Common.update(ProductsModel.table, { id }, selector);
  //     console.log(result);
  //     return result as unknown as IProduct[];
  //   } catch (e) {
  //     throw new Error(`Cannot get id ${id} product from ${this.table}`);
  //   }
  // }
}
export default ProductsModel;
