import { Router } from "express";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";


import AddLikeController from "../controllers/AddLikeController";
const addLikeController = new AddLikeController();
import RemoveLikeController from "../controllers/RemoveLikeController";
const removeLikeController = new RemoveLikeController();
import ListAllLikesIdController from "../controllers/ListAllLikesIdController";
const listAllLikesIdController = new ListAllLikesIdController()

class LikeRouter {
  likeRouter: Router;

  constructor() {
    this.likeRouter = Router();
    this.likeRouter.post('/add/like/:id', checkIfIsAuthenticate, addLikeController.execute);
    this.likeRouter.delete('/remove/like/:id', checkIfIsAuthenticate, removeLikeController.execute);
    this.likeRouter.get('/list/all/ids', checkIfIsAuthenticate, listAllLikesIdController.execute);
  }

  public execute() {
    return this.likeRouter;
  }

}

export default LikeRouter;
