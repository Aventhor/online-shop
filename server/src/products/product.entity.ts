import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'Products'
})
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: 'product_id'
    })
    id: number;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataType.CHAR(100),
    })
    name: string;

    @Column({
        field: 'price',
        allowNull: false,
        type: DataType.DECIMAL(8, 2),
    })
    price: number;

    @Column({
        field: 'weight',
        allowNull: false,
        type: DataType.DECIMAL(6, 2),
    })
    weight: number

}