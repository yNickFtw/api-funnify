import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../shared/global/types/IController";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";

import ListAllLikesIdService from "../services/ListAllLikesIdService";

export default class ListAllLikesIdController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string

      const userId = getUserIdFromToken(token) as number

      const listAllLikesIdService = container.resolve(ListAllLikesIdService)

      const likes = listAllLikesIdService.execute(userId)

      return res.status(200).json(likes)
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor!" })
      }
    }
  }
}