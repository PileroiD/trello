import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>("PORT");

    app.setGlobalPrefix("api");
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
        exposedHeaders: "set-cookie",
    });

    await app.listen(4444);
}
bootstrap();
