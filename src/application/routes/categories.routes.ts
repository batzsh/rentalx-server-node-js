import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@infra/controllers/cars/CreateCategoryController";
import { ListCategoriesController } from "@infra/controllers/cars/ListCategoriesController";
import { ImportCategoryController } from "@infra/controllers/cars/ImportCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };
