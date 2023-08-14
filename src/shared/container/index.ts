import { container } from "tsyringe";
// @UsersRepository
import { IUserRepository } from "../../modules/users/types/interfaces";
import UserRepository from "../../modules/users/sequelize/repositories/UserRepository";
import { IPostRepository } from "../../modules/posts/types/interfaces";
import PostRepository from "../../modules/posts/sequelize/repositories/PostRepository";

container.register<IUserRepository>(
  "UserRepository",
  UserRepository
)

container.register<IPostRepository>(
  "PostRepository",
  PostRepository
)
