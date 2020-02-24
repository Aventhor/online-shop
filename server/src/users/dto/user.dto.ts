import { User } from '../user.entity'

export class UserDto {

    id: number;

    readonly email: string;

    readonly password: string;

    readonly firstName: string;

    readonly lastName: string;

    readonly middleName: string;

    readonly address: string;

    readonly phoneNumber: string;

    readonly createdAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.middleName = user.middleName;
        this.address = user.address;
        this.phoneNumber = user.phoneNumber;
        this.createdAt = user.createdAt;
    }
}