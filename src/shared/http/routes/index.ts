import { Router } from "express";
// @Routes
import UserRouter from "../../../modules/users/routes/user.router";
import PostRouter from "../../../modules/posts/routes/post.router";
import LikeRouter from "../../../modules/likes/routes/like.router";

const router = Router()

router.use('/users', new UserRouter().execute())
router.use('/posts', new PostRouter().execute())
router.use('/likes', new LikeRouter().execute())

export default router;