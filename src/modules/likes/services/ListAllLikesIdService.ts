import { injectable, inject } from "tsyringe";
import { IAppError } from "../../../shared/utils/IAppError";
import { IUserRepository } from "../../users/types/interfaces";
import { ILikeRepository } from "../types/interfaces";
import { IUser } from "../../users/types/user.interface";

export interface IListAllLikesIdService {
  execute: (userId: number) => Promise<number[]>
}

@injectable()
export default class ListAllLikesIdService implements IListAllLikesIdService, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("LikeRepository")
    private likeRepository: ILikeRepository
  ) {
    this.statusCode = 400;
    this.message = ""
  }
  
  public async execute(userId: number): Promise<number[]> {
    const user: IUser | undefined = await this.userRepository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 404,
        message: "Usuário não encontrado, faça login novamente!"
      }

      throw error;
    }

    const likesArrayObject = await this.likeRepository.listAllLikesId(userId)

    let likedIdsArray: number[] = []

    likesArrayObject.forEach((liked: any) => {
      likedIdsArray.push(liked.postId)
    })

    return likedIdsArray
  }
}
