import { Request, Response } from "express";
import { IController } from "../../../shared/global/types/IController";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import { container } from "tsyringe";
import LoggedUserService from "../services/LoggedUserService";


export default class LoggedUserController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string
      
      const userId = getUserIdFromToken(token) as number

      const loggedUserService = container.resolve(LoggedUserService)

      const user = await loggedUserService.execute(userId)

      return res.status(200).json(user)
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
