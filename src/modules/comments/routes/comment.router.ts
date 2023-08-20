import { Router } from "express";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";

import CreateCommentController from "../controllers/CreateCommentController";
const createCommentController = new CreateCommentController()
import ListAllCommentsByPostIdController from "../controllers/ListAllCommentsByPostIdController";
const listAllCommentsByPostIdController = new ListAllCommentsByPostIdController()

export default class CommentRouter {
  commentRouter: Router;

  constructor() {
    this.commentRouter = Router()
    this.commentRouter.post('/add/:id', checkIfIsAuthenticate, createCommentController.execute)
    this.commentRouter.get('/list/all/:id', checkIfIsAuthenticate, listAllCommentsByPostIdController.execute)
  }

  public execute() {
    return this.commentRouter;
  }

}