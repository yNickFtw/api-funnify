import { injectable, inject } from "tsyringe";
import { IComment } from "../types/comment.interface";
import { IAppError } from "../../../shared/utils/IAppError";
import { IPostRepository } from "../../posts/types/interfaces";
import { ICommentRepository } from "../types/interfaces";

export interface IListAllCommentsByPostIdService {
  execute: (postId: number) => Promise<IComment[]>
}

@injectable()
export default class ListAllCommentsByPostIdService implements IListAllCommentsByPostIdService, IAppError {
  statusCode: number;
  message: string;
  
  constructor(
    @inject("PostRepository")
    private postRepository: IPostRepository,
    @inject("CommentRepository")
    private commentRepository: ICommentRepository
  ){
    this.statusCode = 400,
    this.message = ""
  }

  public async execute(postId: number): Promise<IComment[]> {
    const post = await this.postRepository.findById(postId)

    if(!post) {
      const error: IAppError = {
        statusCode: 404,
        message: "Publicação não encontrada!"
      }

      throw error
    }
    
    const comments = this.commentRepository.findAllByPostId(postId)

    return comments as unknown as IComment[]
  }
}
