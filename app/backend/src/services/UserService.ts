import UsersModel from '../database/models/UsersModel';

export type UserLogin = {
  email: string,
  password: string,
  role?: string,
};

class UserService {
  public static async findUser({ email }: UserLogin): Promise<UserLogin> {
    const users = await UsersModel.findOne({ where: { email } });
    return users as UserLogin;
  }

  public static async findRole(email: string): Promise<string> {
    const users = await UsersModel.findOne({ where: { email } });
    if (!users) throw new Error('user not found');
    return users.role;
  }
}

export default UserService;
