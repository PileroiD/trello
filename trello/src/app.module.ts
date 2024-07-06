import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";

@Module({
    imports: [AuthModule, UserModule, TaskModule, ConfigModule.forRoot()],
})
export class AppModule {}
