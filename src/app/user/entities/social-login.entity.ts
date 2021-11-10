import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'social_logins' })
export class SocialLogin {

    constructor(intialData: Partial<SocialLogin> = null) {
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar', name: 'provider' })
    provider: string;

    @Column({ type: 'varchar', name: 'provider_id' })
    providerId: string;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @OneToOne(() => User, user => user.socialLogin)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

}