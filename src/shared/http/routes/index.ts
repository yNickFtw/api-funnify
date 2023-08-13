import { Router } from "express";
// @Routes
import { UserRouter } from "../../../modules/users/routes/user.router";

const router = Router()

router.use('/users', new UserRouter().getRouter())

export default router;