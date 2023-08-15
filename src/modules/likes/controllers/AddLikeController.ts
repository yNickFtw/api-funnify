import { Request, Response } from 'express'
import { IController } from '../../../shared/global/types/IController'
import { container } from 'tsyringe'
import { getUserIdFromToken } from '../../../shared/utils/getUserIdFromToken';
import AddLikeService from '../services/AddLikeService';

export default class AddLikeController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { id } = req.params;

      const addLikeService = container.resolve(AddLikeService);

      await addLikeService.execute(userId, parseInt(id));

      return res.status(200).json({ message: "Você curtiu está publicação!" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor!" });
      }
    }
  }
}
