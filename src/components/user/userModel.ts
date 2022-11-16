import Common from '../../utils/common';
import { IUser } from './user.interfaces';
import bcrypt from 'bcrypt';
import { config } from '../../../config/sequelize';
export class UserModel {
  static table: string = 'users';
  //create user

  static async createUser(user: object): Promise<IUser | null> {
    try {
      const sql = await Common.dbInsertion(this.table, user);
      if (sql) {
        const result = sql.data[0];
        return result;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Cannot create user ${user.toString()}`);
    }
  }

  static async getAllUsers(): Promise<IUser[]> {
    try {
      const selector = ['id', 'firstname', 'lastname', 'email', 'created_at'];
      const result = await Common.dbFetch(this.table, null, selector);
      return result as IUser[];
    } catch (e) {
      throw new Error(`Cannot get all users from ${this.table}`);
    }
  }

  static async getOneUser(id: string): Promise<IUser | null> {
    try {
      const selector = ['id', 'firstname', 'lastname', 'email', 'created_at'];
      const user = await Common.dbFetch(this.table, { id }, selector);
      if (user?.length) {
        return user[0] as IUser;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Cannot get id ${id} user from ${this.table}`);
    }
  }

  // authenticate user by passing email and password
  static async authenticate(
    email: string,
    password: string
  ): Promise<IUser | null> {
    try {
      const selector = ['password'];
      const connect = await Common.dbFetch(this.table, { email }, selector);

      //check if user found
      if (connect?.length) {
        const result = connect[0] as IUser;
        //true or false
        const checkPassValidity = bcrypt.compareSync(
          `${password}${config.salt}`,
          result?.password
        );
        if (checkPassValidity) {
          const selector = [
            'id',
            'firstname',
            'lastname',
            'email',
            'created_at',
          ];
          const userFound = await Common.dbFetch(this.table, null, selector);
          if (userFound?.length) {
            return userFound[0] as IUser;
          }
        }
      }

      return null;
    } catch (err) {
      throw new Error('Cannot found account');
    }
  }
}
export default UserModel;
