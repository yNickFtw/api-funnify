import { Request, Response } from 'express'
import { IController } from "../../../shared/global/types/IController";
import ListAllService from '../services/ListAllService';
import { container } from 'tsyringe';

export default class ListAllController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const listAllService = container.resolve(ListAllService);

      const posts = await listAllService.execute();

      return res.status(200).json(posts);
    } catch (error: any) {
      if (error.message && error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }
}