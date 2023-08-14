import { Router } from "express";
import { uploadMiddleware } from "../../../shared/middlewares/multer";
import uploadFile from "../../../shared/middlewares/firebase-admin";
import CreateUserController from "../controller/CreateUserController";
import AuthenticateUserController from "../controller/AuthenticateUserController";
import LoggedUserController from "../controller/LoggedUserController";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";
import ChangeProfileImageController from "../controller/ChangeProfileImageController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const loggedUserController = new LoggedUserController();
const changeProfileImageController = new ChangeProfileImageController();

export class UserRouter {
  userRouter: Router;

  constructor() {
    this.userRouter = Router();
    this.userRouter.post("/create", createUserController.execute);
    this.userRouter.post("/authenticate", authenticateUserController.execute);
    this.userRouter.get('/me', checkIfIsAuthenticate, loggedUserController.execute)
    this.userRouter.post('/change/image/profile', checkIfIsAuthenticate, uploadMiddleware, uploadFile, changeProfileImageController.execute)
  }

  public getRouter() {
    return this.userRouter;
  }
}

export default UserRouter;
