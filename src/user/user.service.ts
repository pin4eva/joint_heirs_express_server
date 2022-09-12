/* eslint-disable no-useless-catch */

import { cloudinaryUpload } from "../utils/cloudinaryUpload";
import { UpdateUserInput, UploadImageInput } from "./user.dto";
import { User, UserDocument } from "./user.schema";

export class UserService {
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(input: UpdateUserInput): Promise<UserDocument> {
    try {
      const user = await this.findUserById(input.id);
      Object.assign(user, input);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async deleteUser(id: string) {
    try {
      const user = await this.findUserById(id);

      await user.remove();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async uploadImage(input: UploadImageInput) {
    try {
      const user = await this.findUserById(input.id);
      const imageUrl = await cloudinaryUpload(input.image);
      user.image = imageUrl;
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getUserById(id: string) {
    return await this.findUserById(id);
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
