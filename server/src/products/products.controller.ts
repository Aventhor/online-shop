import { Controller, Get, Req, Param, ParseIntPipe, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOkResponse } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Get()
    @ApiOkResponse({ type: [ProductDto] })
    async findAll(): Promise<ProductDto[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ type: [ProductDto] })
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ProductDto> {
        return await this.productService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    @ApiOkResponse({ type: ProductDto })
    async create(
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        return await this.productService.create(createProductDto);
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    @ApiOkResponse({ type: ProductDto })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return await this.productService.update(id, updateProductDto);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    @ApiOkResponse({ type: ProductDto })
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<Product> {
        return await this.productService.delete(id);
    }
}
