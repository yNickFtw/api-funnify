import { Router } from "express";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";
import { uploadMiddleware } from "../../../shared/middlewares/multer";
import uploadFile from "../../../shared/middlewares/firebase-admin";
//@Controllers
import CreatePostController from "../controllers/CreatePostController";
import ListAllController from "../controllers/ListAllControllers";


const createPostController = new CreatePostController();
const listAllController = new ListAllController()

export default class PostRouter {
  postRouter: Router;

  constructor() {
    this.postRouter = Router()
    this.postRouter.post('/post/create', checkIfIsAuthenticate, uploadMiddleware, uploadFile, createPostController.execute)
    this.postRouter.get('/list/all', listAllController.execute)
  }

  public execute() {
    return this.postRouter;
  }
}
