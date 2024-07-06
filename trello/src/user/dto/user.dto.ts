import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    MinLength,
} from "class-validator";

export class PomodoroSettingsToDo {
    @IsOptional()
    @IsNumber()
    @Min(1)
    workInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInetrval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    intervalsCount?: number;
}

export class UserDto extends PomodoroSettingsToDo {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsOptional()
    @MinLength(6, {
        message: "Password must be at least 6 characters long",
    })
    @IsString()
    password?: string;
}
