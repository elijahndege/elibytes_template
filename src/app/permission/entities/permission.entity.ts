import { Role } from "@src/app/role/entities/role.entity";
import { AppSubject } from "@src/app/subject/entities/subject.entity";
import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity('permissions')
export class Permission extends BaseEntity {
    constructor(intialData: Partial<Permission> = null) {
        super();
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @Column({ type: 'varchar', name: 'action' })
    action: string;

    @Column({ type: 'uuid', name: 'object_id' })
    objectId: string;

    @Column({ type: 'json', name: 'condition' })
    condition: string[];
      
    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];

    @ManyToOne(() => AppSubject, subject => subject.permissions)
    @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
    subject: AppSubject;
}
