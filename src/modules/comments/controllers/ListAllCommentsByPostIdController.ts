import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../shared/global/types/IController";
import ListAllCommentsByPostIdService from "../services/ListAllCommentsByPostIdService";

export default class ListAllCommentsByPostIdController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const listAllCommentsByPostIdService = container.resolve(ListAllCommentsByPostIdService)

      const comments = await listAllCommentsByPostIdService.execute(parseInt(id))

      return res.status(200).json(comments)
    } catch (error: any) {
      if (error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: error.message })
      }
    }
  }
}

