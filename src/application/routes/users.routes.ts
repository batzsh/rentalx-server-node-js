import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/MulterUpload";

import { CreateUserController } from "@infra/controllers/accounts/CreateUserController";
import { UpdateUserAvatarController } from "@infra/controllers/accounts/UpdateUserAvatarController";

import { ensureAuthentication } from "@domains/_shared/middlewares/ensureAuthentication";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUsersController.handle);
usersRoutes.patch("/avatar", ensureAuthentication, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };
