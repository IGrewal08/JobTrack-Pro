import { Router } from "express";
import { jobsController } from "@/controllers/jobs.controller.js";

export const jobsRouter = Router();

jobsRouter.get("/", jobsController.list);