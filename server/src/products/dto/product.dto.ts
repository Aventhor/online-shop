import { Product } from '../product.entity';

export class ProductDto {

    id: number;

    readonly name: string;

    readonly price: number;

    readonly weight: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.weight = product.weight;
    }
}