import { Sequelize } from 'sequelize-typescript';
import { MODELS } from './models';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'shop',
                define: {
                    timestamps: false,
                }
            });
            sequelize.addModels(MODELS)
            await sequelize.sync();
            return sequelize;
        },
    },
];
