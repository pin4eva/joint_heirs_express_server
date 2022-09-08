/* eslint-disable no-useless-catch */

import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { config } from "../utils/config.utils";
import {
  LoginInput,
  LoginResponse,
  SignupInput,
  UpdateUserInput,
} from "./user.dto";
import { User, UserDocument } from "./user.model";

export class UserService {
  async getUsers() {
    try {
      const users = await User.find().select("-password");
      return users;
    } catch (error) {
      throw error;
    }
  }
  async signup(input: SignupInput): Promise<string> {
    try {
      let user = await User.findOne({ email: input.email });
      if (user) throw new Error("Email already in use");
      user = new User(input);
      user.password = hashSync(input.password, 10);
      await user.save();
      return user.id;
    } catch (error) {
      throw error;
    }
  }

  public async login(input: LoginInput): Promise<LoginResponse> {
    try {
      const user = await User.findOne({ email: input.email });
      if (!user) throw new Error("User not found");
      const isMatch = compareSync(input.password, user.password);
      if (!isMatch) throw new Error("Email or password not correct");
      const token = sign({ id: user.id }, config.SECRET);
      return { token };
    } catch (error) {
      throw new Error(String(error));
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
