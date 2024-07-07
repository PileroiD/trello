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
import { PomodoroRoundDto, PomodoroSessionDto } from "./dto/pomodoro.dto";
import { PomodoroService } from "./pomodoro.service";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { Auth } from "src/auth/decorators/auth.decorator";

@Controller("user/timer")
export class PomodoroController {
    constructor(private readonly pomodoroService: PomodoroService) {}

    @Get("today")
    @Auth()
    async getTodaySession(@CurrentUser("id") userId: string) {
        return this.pomodoroService.getTodaySession(userId);
    }

    @HttpCode(200)
    @Post()
    @Auth()
    async create(@CurrentUser("id") userId: string) {
        return this.pomodoroService.create(userId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(":id")
    @Auth()
    async update(
        @Body() dto: PomodoroSessionDto,
        @Param("id") sessionId: string,
        @CurrentUser("id") userId: string
    ) {
        return this.pomodoroService.update(dto, sessionId, userId);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put("/round/:id")
    @Auth()
    async updateRound(
        @Body() dto: PomodoroRoundDto,
        @Param("id") roundId: string
    ) {
        return this.pomodoroService.updateRound(dto, roundId);
    }

    @HttpCode(200)
    @Delete(":id")
    @Auth()
    async deleteSession(
        @Param("id") sessionId: string,
        @CurrentUser("id") userId: string
    ) {
        return this.pomodoroService.deleteSession(sessionId, userId);
    }
}
