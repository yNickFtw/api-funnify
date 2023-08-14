import { inject, injectable } from "tsyringe";
import { IAppError } from "../../../shared/utils/IAppError";
import { IUserRepository } from "../types/interfaces";
import { IUser } from "../types/user.interface";

export interface ILoggedUserService {
  execute: (userId: number) => Promise<IUser | undefined>
}

@injectable()
export default class LoggedUserService implements ILoggedUserService, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private repository: IUserRepository
  ) {
    this.statusCode = 400
    this.message = ""
  }
  
  public async execute(userId: number): Promise<IUser | undefined> {
    const user: IUser | undefined = await this.repository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 404,
        message: "Usuário não encontrado, faça login novamente!"
      }

      throw error
    }

    return user
  }
}
