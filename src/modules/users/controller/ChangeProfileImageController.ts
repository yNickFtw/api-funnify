import { Request, Response } from "express";
import { IController } from "../../../shared/global/types/IController";
import { IAppError } from "../../../shared/utils/IAppError";
import ChangeProfileImageService from "../services/ChangeProfileImageService";
import { container } from "tsyringe";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";

export default class ChangeProfileImageController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const changeProfileImageService = container.resolve(ChangeProfileImageService)

      if(req.file) {
        const token = req.headers["authorization"] as string

        const userId = getUserIdFromToken(token) as number

        const { firebaseUrl, filename } = req.file as any;

        await changeProfileImageService.execute({ userId, profileImage: firebaseUrl, profileImageFilename: filename })

        return res.status(200).json({ message: "Foto de perfil alterada!" })
      } else {
        return res.status(400).json({ message: "Você precisa passar uma imagem!" })
      }
    } catch (error: IAppError | any) {
      if (error.message && error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
  }
}
