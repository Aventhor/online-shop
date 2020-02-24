import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof User
    ) { }

    async findAll(): Promise<UserDto[]> {
        const users = await this.usersRepository.findAll();

        return users.map(user => {
            return new UserDto(user);
        })
    }

    async findOne(id: number): Promise<UserDto> {
        const unitType = await this.usersRepository.findByPk<User>(id);
        if (!unitType) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return new UserDto(unitType);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne<User>({
            where: { email },
        });
    }

    async create(createUser: CreateUserDto): Promise<User> {
        try {
            return await this.usersRepository.create<User>(createUser);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new HttpException(
                    `User with this email already exists`,
                    HttpStatus.CONFLICT,
                );
            }
            if (error.message === 'password:empty') {
                throw new HttpException(
                    `Password must contain at least 1 character`,
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateUser: UpdateUserDto): Promise<User> {
        try {
            const user = await this.usersRepository.findByPk(id);
            if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

            user.email = updateUser.email || user.email;
            user.password = updateUser.password || user.password;
            user.firstName = updateUser.firstName || user.firstName;
            user.lastName = updateUser.lastName || user.lastName;
            user.middleName = updateUser.middleName || user.middleName;
            user.address = updateUser.address || user.address;
            user.phoneNumber = updateUser.phoneNumber || user.phoneNumber;

            return await user.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<User> {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        await user.destroy();
        return user;
    }
}
