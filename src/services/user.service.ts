import UserModel, { User } from "../models/user.model";

export const newUser = (input: Partial<User>) => {
  return UserModel.create(input);
};

export const findUserById = (id: string) => {
  return UserModel.findById(id);
};
