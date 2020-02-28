import { Controller, Get, Param, ParseIntPipe, Post, Body, Req, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard())
    @Get()
    @ApiOkResponse({ type: [UserDto] })
    async findAll(): Promise<UserDto[]> {
        return await this.usersService.findAll();
    }

    @UseGuards(AuthGuard())
    @Get(':id')
    @ApiOkResponse({ type: [UserDto] })
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
        return await this.usersService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    @ApiCreatedResponse({ type: User })
    async create(
        @Body() createUserDto: CreateUserDto,
    ): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    @ApiOkResponse({ type: User })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateUnitType: UpdateUserDto
    ): Promise<User> {
        return await this.usersService.update(id, updateUnitType);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    @ApiOkResponse({ type: User })
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<User> {
        return await this.usersService.delete(id);
    }
}
