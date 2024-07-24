import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { TaskDto } from "./dto/task.dto";

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {}

    async getAll(userId: string) {
        return this.prisma.task.findMany({
            where: {
                userId,
            },
            orderBy: {
                index: "asc",
            },
        });
    }

    async create(dto: TaskDto, userId: string) {
        return this.prisma.task.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
        return this.prisma.task.update({
            where: {
                userId,
                id: taskId,
            },
            data: dto,
        });
    }

    async updateTaskOrder(
        taskOrder: { id: string; index: number }[],
        userId: string
    ): Promise<any[]> {
        await this.prisma.$transaction(async (prisma) => {
            for (const task of taskOrder) {
                const { id, index } = task;
                await prisma.task.update({
                    where: {
                        userId,
                        id,
                    },
                    data: { index },
                });
            }
        });

        const updatedTasks = await this.prisma.task.findMany({
            where: { userId },
            orderBy: { index: "asc" },
        });

        return updatedTasks;
    }

    async delete(taskId: string) {
        return this.prisma.task.delete({
            where: {
                id: taskId,
            },
        });
    }
}
