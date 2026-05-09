import { JobType, Prisma, type Job } from "@prisma/client";
import { prisma } from "../config/prisma.js";

export function parseType(value: unknown): JobType | undefined {
    if (typeof value != "string") return undefined;
    const upper = value.toUpperCase();
    if (upper in JobType) return upper as JobType;
    return undefined;
}

type JobWriteData = {
  title: string;
  company: string;
  description: string;
  url: string;
  source: string;
  hash: string;
  tags: string[];
  remote: boolean;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: JobType;
  postedAt?: Date;
  expiresAt?: Date;
};

export const jobServices = {

    getById: async (id: number) => {
        return prisma.job.findUnique({
            where: {
                id
            }
        });
    },

    list: async (filters: {
        title?: string;
        company?: string;
        location?: string;
        salaryMin?: number;
        salaryMax?: number;
        postedAt?: Prisma.SortOrder;
        createdAt?: Prisma.SortOrder;
        expiresAt?: Prisma.SortOrder;
        jobType?: JobType;
        remote?: boolean;
        tags?: string[];
    }) => {
        return prisma.job.findMany({
            where: {
                ...(filters.title     && { title:   { contains: filters.title, mode: "insensitive" } }),
                ...(filters.company   && { company: { contains: filters.company, mode: "insensitive" } }),
                ...(filters.location  && { location: { contains: filters.location, mode: "insensitive" } }),
                ...(filters.salaryMin && { salaryMin: { gte: filters.salaryMin } }),
                ...(filters.salaryMax && { salaryMax: { lte: filters.salaryMax } }),
                ...(filters.jobType   && { jobType: filters.jobType }),
                ...(filters.remote !== undefined && { remote: filters.remote }),
                ...(filters.tags && filters.tags.length > 0 && { tags: { hasSome: filters.tags } }),
            },
            orderBy: [
                ...(filters.postedAt  ? [{ postedAt:  filters.postedAt  }] : []),
                ...(filters.createdAt ? [{ createdAt: filters.createdAt }] : []),
                ...(filters.expiresAt ? [{ expiresAt: filters.expiresAt }] : []),
            ],
        });
    },

    create: async (data: JobWriteData) => {
        return await prisma.job.create({
            data
        });
    },

    update: async (
        id: number,
        data: Partial<JobWriteData>
    ) => {
        return prisma.job.update({
            where: {
                id
            },
            data
        })
    },

    delete: async (id: number) => {
        return prisma.job.delete({
            where: {
                id
            }
        });
    }
}