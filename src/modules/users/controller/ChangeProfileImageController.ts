import { Request, Response } from "express";
import { IController } from "../../../shared/global/types/IController";
import { IAppError } from "../../../shared/utils/IAppError";

export default class ChangeProfileImageController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      if(req.file) {
        const { firebaseUrl, filename } = req.file as any;

        const formatParts = filename.split('.')
        const format = formatParts[formatParts.length - 1]

        console.log("FORMAT PARTS: " + format)

        console.log(firebaseUrl, filename)
      }

      return res.status(200).json("ENDPOINT WORKING!")
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
