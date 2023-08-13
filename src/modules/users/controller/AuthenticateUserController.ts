import { Request, Response } from "express";

import { IController } from "../../../shared/global/types/IController";
import { IAuthenticateService } from "../services/AuthenticateUserService";

export default class AuthenticateUserController implements IController {
  constructor(private authenticateUserService: IAuthenticateService) {}

  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body

      await this.authenticateUserService.execute({ email, password })

      return res.status(200).json({ message: "Autenticado com sucesso!" })
    } catch (error: any) {
      if(error.message && error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor!" })
      }
    }
  }
}
