import { compareSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../user/user.schema";
import { config } from "../utils/config.utils";
import { LoginInput, LoginResponse, SignupInput } from "./auth.dto";
import { Auth } from "./auth.model";

export class AuthService {
  // signup
  public async signup(input: SignupInput): Promise<string> {
    const { email, password, ...rest } = input;
    try {
      // check for duplicate email
      let auth = await Auth.findOne({ email });
      if (auth) throw new Error("Account already exist, log in instead");
      // create an instance of the auth
      auth = new Auth({ email });
      auth.password = this.hashPassword(password);
      // check if a user profile with the same email exist
      let user = await User.findOne({ email });
      if (!user) {
        user = new User(rest);
        user.email = email;
        await user.save();
      }
      //  save th auth.profile to be user
      auth.profile = user.id;
      // save auth
      auth.save();

      // return auth id
      return user.id;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // login
  public async login(input: LoginInput): Promise<LoginResponse> {
    const { email, password } = input;
    try {
      // find the user by email or throw error
      const auth = await Auth.findOne({ email });
      if (!auth) throw new Error("Account not registered");
      // validate the password
      this.comparePassword(password, auth.password);

      // get the user
      const user = await User.findById(auth.profile);
      if (!user) throw new Error("User not found");
      // create a token
      const token = sign({ id: user.id }, config.SECRET);
      // return payload
      return {
        token,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // get me
  async getMe(id: string) {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // verify email

  // reset password

  // change password

  // delete auth
  public async deleteAuth(id: string) {
    try {
      const auth = await Auth.findById(id);
      if (!auth) throw new Error("invalid id");
      await auth.remove();
      return {
        id: auth.id,
        email: auth.email,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
  // hash password
  private hashPassword(password: string): string {
    const hashedPassword = hashSync(password, 10);
    return hashedPassword;
  }

  // compare password
  private comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): boolean {
    const isMatch = compareSync(plainPassword, hashedPassword);
    if (!isMatch) throw new Error("Email or password incorrect");
    return isMatch;
  }
}
