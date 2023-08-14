import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IController } from '../../../shared/global/types/IController';
import { getUserIdFromToken } from '../../../shared/utils/getUserIdFromToken';
import CreatePostService from '../services/CreatePostService';

export default class CreatePostController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;
      const userId = getUserIdFromToken(token) as number;

      const createPostService = container.resolve(CreatePostService);

      if (!req.file && !req.body.title) {
        return res.status(400).json({ message: "Você precisa adicionar alguma imagem ou vídeo!" });
      }

      let title = req.body.title;
      let imageUrl: string | null = null;
      let imageFilename: string | null = null;
      let videoUrl: string | null = null;
      let videoFilename: string | null = null;

      if (req.file) {
        const { firebaseUrl, mimetype, filename } = req.file as any;

        if (mimetype.startsWith("video/")) {
          videoUrl = firebaseUrl;
          videoFilename = filename;
        } else if (mimetype.startsWith("image/")) {
          imageUrl = firebaseUrl;
          imageFilename = filename;
        }
      }

      await createPostService.execute({
        title,
        imageUrl,
        imageFilename,
        videoUrl,
        videoFilename,
        userId
      });

      return res.status(200).json({ message: "Publicação criada!" });
    } catch (error: any) {
      if (error.message && error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor!" });
      }
    }
  }
}
