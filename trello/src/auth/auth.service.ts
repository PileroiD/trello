import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./dto/auth.dto";
import { verify } from "argon2";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    readonly REFRESH_TOKEN_NAME = "refreshToken";
    readonly EXPIRE_DAY_REFRESH_TOKEN = 1;

    constructor(
        private jwt: JwtService,
        private userService: UserService,
        private readonly configService: ConfigService
    ) {}

    async login(dto: AuthDto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);

        return {
            user,
            ...tokens,
        };
    }

    async register(dto: AuthDto) {
        const oldUser = await this.userService.getByEmail(dto.email);

        if (oldUser) throw new BadRequestException("User already exists");

        const { password, ...user } = await this.userService.create(dto);

        const tokens = this.issueTokens(user.id);

        return {
            user,
            ...tokens,
        };
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result) throw new UnauthorizedException("Invalid refresh token");

        const { password, ...user } = await this.userService.getById(result.id);

        const tokens = this.issueTokens(user.id);

        return {
            user,
            ...tokens,
        };
    }

    private issueTokens(userId: string) {
        const data = { id: userId };

        const accessToken = this.jwt.sign(data, {
            expiresIn: "1h",
        });

        const refreshToken = this.jwt.sign(data, {
            expiresIn: "7d",
        });

        return { accessToken, refreshToken };
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userService.getByEmail(dto.email);

        if (!user) throw new NotFoundException("User not found");

        const isValid = await verify(user.password, dto.password);

        if (!isValid)
            throw new UnauthorizedException("Invalid email or password");

        return user;
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const domain = this.configService.get<string>("DOMAIN");

        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain,
            expires: expiresIn,
            secure: true,
            sameSite: "none",
        });
    }

    removeRefreshTokenFromResponse(res: Response) {
        const domain = this.configService.get<string>("DOMAIN");

        res.cookie(this.REFRESH_TOKEN_NAME, "", {
            httpOnly: true,
            domain,
            expires: new Date(0),
            secure: true,
            sameSite: "none",
        });
    }
}
