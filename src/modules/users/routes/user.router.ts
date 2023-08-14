import { Router } from "express";
import CreateUserController from "../controller/CreateUserController";
import AuthenticateUserController from "../controller/AuthenticateUserController";
import LoggedUserController from "../controller/LoggedUserController";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const loggedUserController = new LoggedUserController();

export class UserRouter {
  userRouter: Router;

  constructor() {
    this.userRouter = Router();
    this.userRouter.post("/create", createUserController.execute);
    this.userRouter.post("/authenticate", authenticateUserController.execute);
    this.userRouter.get('/me', checkIfIsAuthenticate, loggedUserController.execute)
  }

  public getRouter() {
    return this.userRouter;
  }
}

export default UserRouter;
