import { injectable, inject } from "tsyringe";
import { IAppError } from "../../../shared/utils/IAppError";
import { IUserRepository } from "../../users/types/interfaces";
import { ILikeRepository } from "../types/interfaces";
import { IUser } from "../../users/types/user.interface";
import { IPost } from "../../posts/types/post.interface";
import { IPostRepository } from "../../posts/types/interfaces";

export interface IRemoveLikeService {
  execute: (userId: number, postId: number) => Promise<void>
}

@injectable()
export default class RemoveLikeService implements IRemoveLikeService, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("likeRepository")
    private likeRepository: ILikeRepository,
    @inject("postRepository")
    private postRepository: IPostRepository,
    ) {
    this.statusCode = 400;
    this.message = ""
  }
  
  public async execute(userId: number, postId: number): Promise<void> {
    const user: IUser | undefined = await this.userRepository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 404,
        message: "Usuário não encontrado!"
      }

      throw error;
    }
  
    const post: IPost | undefined = await this.postRepository.findById(postId)
    
    if(!post) {
      const error: IAppError = {
        statusCode: 404,
        message: "Publicação não encontrada!"
      }
    }

    await this.likeRepository.removeLike(userId, postId)

    return
  }
}
