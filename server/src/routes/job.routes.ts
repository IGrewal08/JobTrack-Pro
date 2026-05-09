import { Router } from "express";
import { jobController } from "../controllers/job.controller.js";

export const jobRouter = Router();

jobRouter.get("/id", jobController.getById);
jobRouter.get("/", jobController.list);
jobRouter.post("/", jobController.create);
jobRouter.put("/id", jobController.update);
jobRouter.delete("/id", jobController.remove);