import Common from '../../utils/common';
import { IProduct } from './productType';
import db from '../../database';

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

  //display all products and store it in an array
  static async getAllProducts(): Promise<IProduct[]> {
    try {
      const selector = ['id', 'name', 'price', 'description'];
      const result = await Common.dbFetch(ProductsModel.table, null, selector);
      return result as IProduct[];
    } catch (e) {
      throw new Error(`Cannot get all products from ${this.table}`);
    }
  }

  //get one specific product by id
  static async getOneProduct(id: string): Promise<IProduct | null> {
    try {
      const result = await Common.dbFetch(ProductsModel.table, { id });
      if (result?.length) {
        return result[0] as IProduct;
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(`Cannot get id ${id} product from ${this.table}`);
    }
  }

  // update product
  static async updateOneProduct(product: IProduct): Promise<IProduct> {
    try {
      const conn = await db.connect();
      const sql = `UPDATE product SET name =$1 , price=$2 , description =$3 WHERE id = $4 RETURNING *`;
      const values = [
        product.name,
        product.price,
        product.description,
        product.id,
      ];
      const result = await db.query(sql, values);

      conn.release();
      return result.rows[0];
    } catch (e) {
      throw new Error(`Cannot get update product from : ${this.table}`);
    }
  }

  //delete specific products
  static async deleteProduct(id: string): Promise<IProduct> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE from product WHERE id =$1 RETURNING *';
      const values = [id];
      const result = await db.query(sql, values);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Cannot delete product id : ${id} from table : ${this.table}`
      );
    }
  }
}
export default ProductsModel;
