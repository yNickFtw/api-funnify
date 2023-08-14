import { IPostRepository } from "../types/interfaces";
import { injectable, inject } from "tsyringe";
import { IPost } from "../types/post.interface";
import { IAppError } from "../../../shared/utils/IAppError";
import { IUserRepository } from "../../users/types/interfaces";

export interface ICreatePostService {
  execute: ({ title, imageUrl, imageFilename, videoUrl, videoFilename, userId }: Partial<IPost>) => Promise<void>
}

@injectable()
export default class CreatePostService implements ICreatePostService, IAppError {
  statusCode: number;
  message: string;
  
  constructor(
    @inject("PostRepository")
    private postRepository: IPostRepository, 
    @inject("UserRepository")
    private userRepository: IUserRepository
    ) {
    this.statusCode = 400
    this.message = ""
  }
  
  public async execute({ title, imageUrl, imageFilename, videoUrl, videoFilename, userId }: Partial<IPost>): Promise<void> {
    const user = await this.userRepository.findById(userId!)

    if(!user) {
      const error: IAppError = {
        statusCode: 400,
        message: "Usuário não encontrado, faça login novamente!"
      }
      
      throw error
    }

    if(imageUrl !== null && imageFilename !== null) {
      const newPost: Partial<IPost> = {
        title: title,
        imageUrl: imageUrl,
        imageFilename: imageFilename,
        videoUrl: null,
        videoFilename: null,
        userId: userId
      }

      await this.postRepository.create(newPost)

      return
    } else if (videoUrl !== null && videoFilename !== null) {
      const newPost: Partial<IPost> = {
        title: title,
        imageUrl: null,
        imageFilename: null,
        videoUrl: videoUrl,
        videoFilename: videoFilename,
        userId: userId
      }

      await this.postRepository.create(newPost)

      return
    }
  }
}