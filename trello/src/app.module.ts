import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { TaskModule } from "./task/task.module";
import { TimeBlockModule } from "./time-block/time-block.module";

@Module({
    imports: [
        AuthModule,
        UserModule,
        TaskModule,
        TimeBlockModule,
        ConfigModule.forRoot(),
    ],
})
export class AppModule {}
