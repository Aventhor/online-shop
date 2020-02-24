import { Table, Column, Model, DataType, Unique, IsEmail, BeforeCreate, BeforeUpdate, BeforeValidate } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';

@Table({
    tableName: 'Users'
})
export class User extends Model<User> {
    @Column({
        field: 'user_id',
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Unique
    @IsEmail
    @Column({
        field: 'email',
        type: DataType.CHAR(50),
        allowNull: false,
    })
    email: string;

    @Column({
        field: 'password',
        type: DataType.CHAR(255),
        allowNull: false
    })
    password: string;

    @Column({
        field: 'first_name',
        type: DataType.CHAR(50),
        allowNull: false
    })
    firstName: string;

    @Column({
        field: 'last_name',
        type: DataType.CHAR(50),
        allowNull: false
    })
    lastName: string;

    @Column({
        field: 'middle_name',
        type: DataType.CHAR(50),
        allowNull: false
    })
    middleName: string;

    @Column({
        field: 'address',
        type: DataType.CHAR(255),
    })
    address: string;

    @Column({
        field: 'phone_number',
        type: DataType.CHAR(15),
    })
    phoneNumber: string;

    @Column({
        field: 'created_at',
        type: DataType.DATE,
    })
    createdAt: Date;

    @BeforeValidate
    public static validate(user: User) {
        if (user.password === '') throw new Error('password:empty');
    }

    @BeforeCreate
    @BeforeUpdate
    public static async hashPassword(user: User) {
        const hash = await this.generateHash(user.password);
        user.password = hash;
    }

    public static async generateHash(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    public static async comparePasswords(password: string, passwordToCompare: string) {
        const result = await bcrypt.compare(password, passwordToCompare);
        return result;
    }
}