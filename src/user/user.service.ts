/* eslint-disable no-useless-catch */

import { UpdateUserInput } from "./user.dto";
import { User, UserDocument } from "./user.model";

export class UserService {
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(input: UpdateUserInput) {
    try {
      const user = await this.findUserById(input.id);
      Object.assign(user, input);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  private async findUserById(id: string): Promise<UserDocument> {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
