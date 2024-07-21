import { Injectable } from "@nestjs/common";
import { hash } from "argon2";

import { PrismaService } from "src/prisma.service";
import { AuthDto } from "src/auth/dto/auth.dto";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    getById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    getByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async getProfile(id: string) {
        const profile = await this.getById(id);

        const { password, ...user } = profile;

        return {
            user,
        };
    }

    async create(dto: AuthDto) {
        const user = {
            email: dto.email,
            name: "",
            password: await hash(dto.password),
        };

        return this.prisma.user.create({
            data: user,
        });
    }

    async update(id: string, dto: UserDto) {
        let data = dto;

        if (dto.password) {
            data = { ...dto, password: await hash(dto.password) };
        }

        return this.prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                name: true,
                email: true,
            },
        });
    }
}
