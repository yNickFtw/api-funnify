import { container } from "tsyringe";
// @UsersRepository
import { IUserRepository } from "../../modules/users/types/interfaces";
import UserRepository from "../../modules/users/sequelize/repositories/UserRepository";

container.register<IUserRepository>(
  "UserRepository",
  UserRepository
)