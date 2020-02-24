import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) throw new HttpException(`User with this email doesn't exists`, HttpStatus.BAD_REQUEST);

        const isMatch = await User.comparePasswords(pass, user.password);

        if (!isMatch) {
            throw new HttpException(`Incorrect password`, HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUser: CreateUserDto): Promise<User> {
        const user = await this.usersService.create(createUser);
        return user;
    }
}