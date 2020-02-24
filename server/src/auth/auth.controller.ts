import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Request() req
    ) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async register(
        @Body() user: CreateUserDto
    ) {
        console.log(user)
        return await this.authService.register(user);
    }

    @UseGuards(AuthGuard())
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}