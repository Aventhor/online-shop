import { Controller, Get, Param, ParseIntPipe, Post, Body, Req, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOkResponse({ type: [UserDto] })
    async findAll(): Promise<UserDto[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: [UserDto] })
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
        return await this.usersService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: User })
    async create(
        @Body() createUserDto: CreateUserDto,
        // @Req() request,
    ): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: User })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateUnitType: UpdateUserDto
    ): Promise<User> {
        return await this.usersService.update(id, updateUnitType);
    }

    @Delete(':id')
    @ApiOkResponse({ type: User })
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
        // @Req() request: Request
    ): Promise<User> {
        return await this.usersService.delete(id);
    }
}
