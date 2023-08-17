import { injectable, inject } from 'tsyringe'
import { IAppError } from '../../../shared/utils/IAppError'
import { IPostRepository } from '../../posts/types/interfaces'
import { IUserRepository } from '../../users/types/interfaces'
import { ICommentRepository } from '../types/interfaces'

export interface ICreateCommentService {
  execute: (content: string, userId: number, postId: number) => Promise<void>
}

@injectable()
export default class CreateCommentService implements ICreateCommentService, IAppError {
  statusCode: number
  message: string

  constructor(
    @inject("PostRepository")
    private postRepository: IPostRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CommentRepository")
    private commentRepository: ICommentRepository,
  ) {
    this.statusCode = 400
    this.message = ""
  }
  
  public async execute(content: string, userId: number, postId: number): Promise<void> {
    if(!content) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha o campod de comentário!"
      }

      throw error;
    }

    const [postExists, userExists] = await Promise.all([
      this.postRepository.findById(postId),
      this.userRepository.findById(userId)
    ])

    if(!userExists) {
      const error: IAppError = {
        statusCode: 404,
        message: "Usuário não encontrado, faça o login novamente!"
      }

      throw error
    }

    if(!postExists) {
      const error: IAppError = {
        statusCode: 404,
        message: "Publicação não encontrada, tente novamente mais tarde!"
      }

      throw error
    }

    await this.commentRepository.create({ content, userId, postId })
  }
}
