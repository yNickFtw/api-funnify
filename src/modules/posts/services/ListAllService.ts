import { injectable, inject } from 'tsyringe'
import { IPost } from '../types/post.interface'
import { IAppError } from '../../../shared/utils/IAppError'
import { IPostRepository } from '../types/interfaces'

export interface IListAllService {
  execute: () => Promise<IPost[]>
}

@injectable()
export default class ListAllService implements IListAllService, IAppError {
  statusCode: number
  message: string

  constructor(
    @inject("PostRepository")
    private postRepository: IPostRepository
  ) {
    this.statusCode = 400,
    this.message = ""
  }

  public async execute(): Promise<IPost[]> {
    const posts: IPost[] = await this.postRepository.findAll()

    return posts
  }

}
