import { Controller, Get, Req, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOkResponse } from '@nestjs/swagger'

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

    @Post()
    @ApiOkResponse({ type: ProductDto })
    async create(
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        return await this.productService.create(createProductDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ProductDto })
    async update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return await this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ProductDto })
    async delete(
        @Param('id', new ParseIntPipe()) id: number,
    ): Promise<Product> {
        return await this.productService.delete(id);
    }
}
