import { Request, Response } from 'express'

import { IController } from '../../../shared/global/types/IController'

export default class CreatePostController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      
      
      return res.status(201).json({ message: "Criado com sucesso" })
    } catch (error: any) {
      if(error.message && error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor!" })
      }
    }
  }
}