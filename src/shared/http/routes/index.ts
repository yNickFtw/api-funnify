import { Router } from "express";
// @Routes
import { UserRouter } from "../../../modules/users/routes/user.router";
import { PostRouter } from "../../../modules/posts/routes/post.router";

const router = Router()

router.use('/users', new UserRouter().getRouter())
router.use('/posts', new PostRouter().getRouter())

export default router;