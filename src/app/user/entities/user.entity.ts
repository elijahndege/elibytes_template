import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Address } from "./adress.entity";
import { LocalLogin } from "./local-login.entity";
import { SocialLogin } from "./social-login.entity";

@Entity('users')
export class User extends BaseEntity{

    constructor(intialData: Partial<User> = null) {
        super();
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @Column({ type: 'varchar', name: 'first_name', })
    firstName: string;

    @Column({ type: 'varchar', name: 'last_name', })
    lastName: string;

    @Column({ type: 'varchar', name: 'avatar', nullable: true })
    avatar: string;

    @Column({ unique: true, type: 'varchar', name: 'email' })
    email: string;

    @Column({ type: 'varchar', name: 'phone', nullable: true })
    phone: string;

    @OneToOne(() => LocalLogin, localLogin => localLogin.user, { cascade: ['insert','update'] })
    localLogin: LocalLogin;

    @OneToOne(() => SocialLogin, socialLogin => socialLogin.user, { cascade: true })
    socialLogin: SocialLogin;

    @OneToOne(() => Address, address => address.user, { cascade: true })
    address: Address;

   
}