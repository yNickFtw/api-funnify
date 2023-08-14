import { Router } from "express";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";
import CreatePostController from "../controllers/CreatePostController";
import { uploadMiddleware } from "../../../shared/middlewares/multer";
import uploadFile from "../../../shared/middlewares/firebase-admin";

const createPostController = new CreatePostController();

export class PostRouter {
  postRouter: Router;

  constructor() {
    this.postRouter = Router()
    this.postRouter.post('/post/create', checkIfIsAuthenticate, uploadMiddleware, uploadFile, createPostController.execute)
  }

  public getRouter() {
    return this.postRouter;
  }
}

export default PostRouter;
