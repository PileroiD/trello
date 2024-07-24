import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { TaskDto } from "./dto/task.dto";
import { TaskService } from "./task.service";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller("user/tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    @Auth()
    async getAll(@CurrentUser("id") userId: string) {
        return this.taskService.getAll(userId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    async create(@Body() dto: TaskDto, @CurrentUser("id") userId: string) {
        return this.taskService.create(dto, userId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(":id")
    @Auth()
    async update(
        @Body() dto: TaskDto,
        @CurrentUser("id") userId: string,
        @Param("id") taskId: string
    ) {
        return this.taskService.update(dto, taskId, userId);
    }

    @HttpCode(200)
    @Post("update-order")
    @Auth()
    async updateOrder(
        @Body() body: { id: string; index: number }[],
        @CurrentUser("id") userId: string
    ) {
        return this.taskService.updateTaskOrder(body, userId);
    }

    @HttpCode(200)
    @Delete(":id")
    @Auth()
    async delete(@Param("id") taskId: string) {
        return this.taskService.delete(taskId);
    }
}
