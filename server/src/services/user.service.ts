import { User, UserModel } from '../models/user.model';

export class UserService {
  async getUsers(): Promise<User[]> {
    return await UserModel.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await UserModel.findOne({ username });
  }

  async createUser(name: string, username: string, password: string): Promise<User> {
    const user = new UserModel({ name, username, password });
    return await user.save();
  }

  async updateUser(id: string, name: string, username: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    if (user) {
      user.name = name;
      user.username = username;
      return await user.save();
    }
    return null;
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }
}