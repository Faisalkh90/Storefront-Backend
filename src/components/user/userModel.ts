import Common from '../../utils/common';

export class UserModel {
  static table: string = 'users';

  //create user

  static async createUser(user: Object): Promise<UserModel | null> {
    try {
      const sql = await Common.dbInsertion(this.table, user);
      if (sql) {
        //hide password
        const result = sql.data[0];
        result.password = undefined;
        return result;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`Cannot create user ${user.toString()}`);
    }
  }

  static async getAllUsers(): Promise<object[]> {
    try {
      const selector = ['id', 'firstname', 'lastname', 'email', 'created_at'];
      const result = await Common.dbFetch(this.table, null, selector);
      // @ts-ignore
      return result;
    } catch (e) {
      throw new Error(`Cannot get all users from ${this.table}`);
    }
  }

  static async getOneUser(id: string): Promise<object | undefined> {
    try {
      const selector = ['id', 'firstname', 'lastname', 'email', 'created_at'];
      const user = await Common.dbFetch(this.table, { id }, selector);
      if (user != undefined) {
        return user;
      }
    } catch (err) {
      throw new Error(`Cannot get id ${id} user from ${this.table}`);
    }
  }
}
export default UserModel;
