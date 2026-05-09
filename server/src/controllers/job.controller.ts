import { type NextFunction, type Request, type Response } from "express";
import { jobServices, parseType } from "../services/job.services.js";
import crypto from "crypto";

export const jobController = {
    
    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const job = await jobServices.getById(Number(req.params.id));
            if (!job) return res.status(404).json({ message: "Job not found." });
            return res.status(200).json(job);
        } catch (err) {
            next(err);
        }
    },

    list: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const rawTags = req.query.tags;
            const tags: string[] =
                Array.isArray(rawTags) ? (rawTags as string[]) : typeof rawTags === "string" ? rawTags.split(",") : [];

            const { title, company, location, salaryMin, salaryMax, postedAt, createdAt, expiresAt, jobType } = req.query;

            const remote =
                req.query.remote === "true" ? true : req.query.remote === "false" ? false : undefined;

            const rawUpdateData = {
                title: typeof title === "string" ? title : undefined,
                company: typeof company === "string" ? company : undefined,
                location: typeof location === "string" ? location : undefined,
                salaryMin: typeof salaryMin === "string" ? Number(salaryMin) : undefined,
                salaryMax: typeof salaryMax === "string" ? Number(salaryMax) : undefined,
                postedAt: postedAt === "asc" || postedAt === "desc" ? postedAt : undefined,
                createdAt: createdAt === "asc" || createdAt === "desc" ? createdAt : undefined,
                expiresAt: expiresAt === "asc" || expiresAt === "desc" ? expiresAt : undefined,
                jobType: jobType ? parseType(req.query.type) : undefined,
                remote,
                tags,
            }

            const cleanUpdateData = Object.fromEntries(
                Object.entries(rawUpdateData).filter(([_, value]) => value !== undefined)
            );

            const jobs = await jobServices.list(cleanUpdateData);

            return res.status(200).json(jobs);
        } catch (err) {
            next(err);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { salaryMin, salaryMax, postedAt, expiresAt, jobType } = req.body;

            if (req.body.remote === undefined || req.body.remote === null) {
                return res.status(400).json({ message: "remote is required." });
            }

            const remote: boolean =
                req.body.remote === true || req.body.remote === "true" ? true : false;

            const rawTags = req.body.tags;
            const tags: string[] =
                Array.isArray(rawTags) ? (rawTags as string[]) : typeof rawTags === "string" ? rawTags.split(",") : [];

            const job = await jobServices.create({
                title: req.body.title,
                company: req.body.company,
                description: req.body.description,
                url: req.body.url,
                source: req.body.source,
                hash: req.body.hash,
                tags,
                remote,
                ...(location && {location: req.body.location}),
                ...(salaryMin && {salaryMin: Number(salaryMin)}),
                ...(salaryMax && {salaryMax: Number(salaryMax)}),
                ...(postedAt && {postedAt: new Date(postedAt)}),
                ...(expiresAt && {expiresAt: new Date(expiresAt)}),
                ...(jobType && parseType(jobType) && {jobType: parseType(jobType)})
            });
            return res.status(200).json(job);
        } catch (err) {
            next(err);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { salaryMin, salaryMax, postedAt, expiresAt, jobType } = req.body;

            const remote =
                req.body.remote === true || req.body.remote === "true" ? true :
                req.body.remote === false || req.body.remote === "false" ? false :
                undefined;


            const rawTags = req.body.tags;
            const tags: string[] =
                Array.isArray(rawTags) ? (rawTags as string[]) : typeof rawTags === "string" ? rawTags.split(",") : [];

            const requiredData = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                description: req.body.description,
                url: req.body.url,
                source: req.body.source,
                hash: req.body.hash,
                tags,
            }

            const rawCleanData = {
                salaryMin: salaryMin ? Number(salaryMin) : undefined,
                salaryMax: salaryMax ? Number(salaryMax) : undefined,
                postedAt: postedAt ? new Date(postedAt) : undefined,
                expiresAt: expiresAt ? new Date(expiresAt) : undefined,
                jobType: jobType ? parseType(jobType) : undefined,
                remote,
            }

            const cleanCreateData = Object.fromEntries(
                Object.entries(rawCleanData).filter(([_, value]) => value !== undefined)
            );

            const job = await jobServices.update(Number(req.params.id), {...cleanCreateData, ...requiredData});
            return res.status(200).json(job);
        } catch (err) {
            next(err);
        }
    },

    remove: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) return res.status(401).json({ message: "Id is required." });
            await jobServices.delete(Number(id));

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

}
