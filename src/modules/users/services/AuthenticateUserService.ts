import { IAppError } from "../../../shared/utils";
import bcrypt from 'bcryptjs'
import { IResponseJWT, generateTokenJWT } from "../../../shared/global/generateToken";
import { IUserRepository } from "../types/interfaces";

interface IRequest {
  email: string;
  password: string;
}

export interface IAuthenticateService {
  execute: ({ email, password }: IRequest) => Promise<IResponseJWT | IAppError>
}

export default class AuthenticateUserService implements IAuthenticateService, IAppError {
  statusCode: number
  message: string
  
  constructor(private repository: IUserRepository) {
    this.statusCode = 400,
    this.message = ""
  }

  public async execute({ email, password }: IRequest): Promise<IResponseJWT | IAppError> {
    if(!email || !password) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha todos os campos!"
      }

      throw error
    }

    const user = await this.repository.findByEmail(email)

    if(!user) {
      const error: IAppError = {
        statusCode: 404,
        message: "Verifique se os dados estão corretos!"
      }
    }

    const passwordMatch = await bcrypt.compare(password, user?.password!)

    if(!passwordMatch){ 
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha todos os campos!"
      }

      throw error      
    }

    return generateTokenJWT("7d", user?.id!)
  }
}
