import { Router } from "express";
import CreateUserController from "../controller/CreateUserController";
import AuthenticateUserController from "../controller/AuthenticateUserController";

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

export class UserRouter {
  userRouter: Router;
  
   constructor() {
    
    this.userRouter = Router();
    this.userRouter.post('/create', createUserController.execute);
    this.userRouter.post('/authenticate', authenticateUserController.execute)
  }

  public getRouter() {
    return this.userRouter
  }
}

export default UserRouter;