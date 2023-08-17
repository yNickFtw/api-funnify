import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../shared/global/types/IController";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import CreateCommentService from "../services/CreateCommentService";

export default class CreateCommentController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string

      const userId = getUserIdFromToken(token) as number

      const { id } = req.params

      const { content } = req.body

      const createCommentService = container.resolve(CreateCommentService)

      await createCommentService.execute(content, userId, parseInt(id))

      return res.status(201).json({ message: "Comentário adicionado" })
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" })
      }
    }
  }
}
