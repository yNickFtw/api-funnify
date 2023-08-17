import { Router } from "express";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";

import CreateCommentController from "../controllers/CreateCommentController";
const createCommentController = new CreateCommentController()

export default class CommentRouter {
  commentRouter: Router;

  constructor() {
    this.commentRouter = Router()
    this.commentRouter.post('/add/:id', checkIfIsAuthenticate, createCommentController.execute)
  }

  public execute() {
    return this.commentRouter;
  }

}