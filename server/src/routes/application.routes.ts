import { Router } from "express";
import { applicationController } from "../controllers/applications.controller.js";

export const applicationRouter = Router();

applicationRouter.get("/:id", applicationController.getById);
applicationRouter.get("/", applicationController.list);
applicationRouter.post("/:id", applicationController.create);
applicationRouter.put("/:id", applicationController.update);
applicationRouter.delete("/:id", applicationController.remove);