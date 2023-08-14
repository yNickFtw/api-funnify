import { Request, Response } from "express";
import { container } from 'tsyringe'

// @Import Services
import CreateUserService from "../services/CreateUserService";
import { IController } from "../../../shared/global/types/IController";

export default class CreateUserController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email, password, confirmPassword } = req.body      

      const createUserService = container.resolve(CreateUserService)
      
      await createUserService.execute({ username, email, password, confirmPassword })

      return res.status(201).json({ message: "Cadastrado com sucesso!" })
    } catch (error: any) {
      if(error.message && error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        console.error(error);
        return res.status(500).json({ message: error.message })
      }
    }
  }
}
