import { UserModel } from '../models/user-model';

export class UserRepository {
  async createUser(userData: { name: string; email: string; password: string }) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }
}
