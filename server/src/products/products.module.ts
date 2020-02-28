import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    controllers: [ProductsController],
    providers: [
        ProductsService
    ],
    exports: [ProductsService]
})
export class ProductsModule { }
