import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/utils/IAppError";
import { IUserRepository } from "../types/interfaces";

interface IRequest {
  userId: number;
  profileImage: string;
  profileImageFilename: string;
}

export interface IChangeProfileImageService {
  execute: ({ userId, profileImage, profileImageFilename }: IRequest) => Promise<void>;
}

@injectable()
export default class ChangeProfileImageService implements IChangeProfileImageService, IAppError {
  statusCode: number;
  message: string;
  
  constructor(
    @inject("UserRepository")
    private repository: IUserRepository
  ) {
    this.statusCode = 400
    this.message = ""
  }
  
  public async execute({ userId, profileImage, profileImageFilename }: IRequest): Promise<void> {
    const user = await this.repository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 400,
        message: "Usuário não encontrado, faça login novamente!"
      }
    }

    await this.repository.changeProfileImage(userId, profileImage, profileImageFilename)

    return
  }
}
