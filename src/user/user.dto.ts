export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateUserInput {
  id: string;
  name: string;
}

export interface LoginResponse {
  token: string;
}
