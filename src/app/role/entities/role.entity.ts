import { Permission } from "@src/app/permission/entities/permission.entity";
import { User } from "@src/app/user/entities/user.entity";
import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity('roles')
export class Role extends BaseEntity {
    constructor(intialData: Partial<Role> = null) {
        super();
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @Column({ type: 'varchar', name: 'name' })
    name: string;

    @Column({ type: 'varchar', name: 'description' })
    description: string;
    
    @ManyToMany(() => User, user => user.roles)
    users: User[];

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: "role_permissions", // table name for the junction table of this relation
        joinColumn: {
            name: "role_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "permission_id",
            referencedColumnName: "id"
        }
    })
    permissions: Permission[];
}
