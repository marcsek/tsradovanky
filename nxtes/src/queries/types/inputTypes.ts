export interface LoginUserParams {
  email: string;
  password: string;
}

export interface RegisterUserParams extends LoginUserParams {
  name: string;
}
