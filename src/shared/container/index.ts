import { container } from "tsyringe";
// @UsersRepository
import { IUserRepository } from "../../modules/users/types/interfaces";
import UserRepository from "../../modules/users/sequelize/repositories/UserRepository";
import { IPostRepository } from "../../modules/posts/types/interfaces";
import PostRepository from "../../modules/posts/sequelize/repositories/PostRepository";
import { ILikeRepository } from "../../modules/likes/types/interfaces";
import LikeRepository from "../../modules/likes/sequelize/repositories/LikeRepository";
import { ICommentRepository } from "../../modules/comments/types/interfaces";
import CommentRepository from "../../modules/comments/sequelize/repository/CommentRepository";

container.register<IUserRepository>(
  "UserRepository",
  UserRepository
)

container.register<IPostRepository>(
  "PostRepository",
  PostRepository
)

container.register<ILikeRepository>(
  "LikeRepository",
  LikeRepository
)

container.register<ICommentRepository>(
  "CommentRepository",
  CommentRepository
)
