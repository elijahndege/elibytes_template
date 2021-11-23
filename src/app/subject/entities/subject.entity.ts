import { Permission } from "@src/app/permission/entities/permission.entity";
import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('subjects')
export class AppSubject extends BaseEntity{

    constructor(intialData: Partial<AppSubject> = null) {
        super();
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @Column({ type: 'varchar', name: 'name' })
    name: string;
    
    @OneToMany(() => Permission, permission => permission.subject)
    permissions: Permission[];

}
