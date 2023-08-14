import bcrypt from 'bcryptjs'
import { IAppError } from "../../../shared/utils/IAppError";
import { IUserRepository } from '../types/interfaces';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICreateUserService {
  execute: ({ username, email, password, confirmPassword }: IRequest) => Promise<void>
}

@injectable()
export default class CreateUserService implements ICreateUserService, IAppError {  
  statusCode: number;
  message: string;

  constructor( 
    @inject("UserRepository")
    private repository: IUserRepository)
    {
    this.message = ""
    this.statusCode = 0
  }

  public async execute({ username, email, password, confirmPassword }: IRequest): Promise<void> {
    if(!username || !email || !password || !confirmPassword) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha todos os campos"
      }
      
      throw error
    }

    if(password !== confirmPassword) {
      const error: IAppError = {
        statusCode: 400,
        message: "As senhas devem ser iguais!"
      }
    
      throw error
    }

    const [userExistsByEmail, userExistsByUsername] = await Promise.all([
      this.repository.findByEmail(email),
      this.repository.findByUsername(username)
    ]);
    
    if(userExistsByEmail || userExistsByUsername) {
      const error: IAppError = {
        statusCode: 400,
        message: "Já existe um usuário com este nome ou email!"
      }
    
      throw error
    }

    try {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);

      await this.repository.create({ username, email, password: hash });

      return
    } catch (error) {
      throw new Error("Erro ao criar usuário.");
    }
  }
}
