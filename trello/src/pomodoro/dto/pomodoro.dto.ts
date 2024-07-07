import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class PomodoroSessionDto {
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;
}

export class PomodoroRoundDto {
    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;

    @IsNumber()
    totalSeconds: number;
}
