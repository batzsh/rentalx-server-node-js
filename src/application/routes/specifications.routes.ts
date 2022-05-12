import { Router } from "express";
import { CreateSpecificationController } from "@infra/controllers/cars/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
