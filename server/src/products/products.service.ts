import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject('PRODUCTS_REPOSITORY') private readonly productsRepository: typeof Product
    ) { }

    async findAll(): Promise<ProductDto[]> {
        const products = this.productsRepository.findAll<Product>();
        return products.map(product => {
            return new ProductDto(product);
        })
    }

    async findOne(id: number): Promise<ProductDto> {
        const product = await this.productsRepository.findOne({ where: { 'product_id': id } });
        return new ProductDto(product);
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = new Product();
        product.name = createProductDto.name;
        product.price = createProductDto.price;
        product.weight = createProductDto.weight;

        try {
            return product.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.productsRepository.findByPk(id);

        product.name = updateProductDto.name || product.name;
        product.price = updateProductDto.price || product.price;
        product.weight = updateProductDto.weight || product.weight;

        try {
            return await product.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number): Promise<Product> {
        const product = await this.productsRepository.findByPk(id);
        await product.destroy();
        return product;
    }
}
