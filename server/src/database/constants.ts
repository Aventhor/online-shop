import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

export const entitiesProviders = [
    {
        provide: 'PRODUCTS_REPOSITORY',
        useValue: Product
    },
    {
        provide: 'USERS_REPOSITORY',
        useValue: User
    }
]