import { Request, Response } from "express";

import { IController } from "../../../shared/global/types/IController";
import AuthenticateUserService from "../services/AuthenticateUserService";
import { container } from "tsyringe";

export default class AuthenticateUserController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
 
      const authenticateUserService = container.resolve(AuthenticateUserService)

      await authenticateUserService.execute({ email, password })

      return res.status(200).json({ message: "Autenticado com sucesso!" })
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
