import { hashString } from '@src/core/utils/password-hash';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'local_login' })
export class LocalLogin {

    constructor(intialData: Partial<LocalLogin> = null) {
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar', name: 'password' })
    password: string;

    @Column({ type: 'boolean', name: 'email_verified', default: false })
    email_verified: boolean;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @BeforeInsert()
    @BeforeUpdate()
    async hashUserPassword() {
        this.password = await hashString(this.password);
    }
}