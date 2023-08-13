import { Router } from "express";
import UserRepository from "../sequelize/repositories/UserRepository";
import CreateUserService from "../services/CreateUserService";
import CreateUserController from "../controller/CreateUserController";
import AuthenticateUserService from "../services/AuthenticateUserService";
import AuthenticateUserController from "../controller/AuthenticateUserController";

export class UserRouter {
  userRouter: Router;
  
   constructor() {
    const userRepository = new UserRepository();
    const createUserService = new CreateUserService(userRepository);
    const createUserController = new CreateUserController(createUserService);
    const authenticateUserService = new AuthenticateUserService(userRepository);
    const authenticateUserController = new AuthenticateUserController(authenticateUserService);
    
    this.userRouter = Router();
    this.userRouter.post('/create', createUserController.execute);
    this.userRouter.post('/authenticate', authenticateUserController.execute);
  }

  public getRouter() {
    return this.userRouter
  }
}

export default UserRouter;