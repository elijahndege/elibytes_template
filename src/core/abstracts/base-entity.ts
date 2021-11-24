import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', name: 'is_active', default: false })
    isActive: boolean;

    @Column({ type: 'varchar', nullable: true, name: 'created_by', length: 300 })
    createdBy: string;

    @Column({ type: 'varchar', nullable: true, name: 'changed_by', length: 300 })
    lastChangedBy: string;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;
}