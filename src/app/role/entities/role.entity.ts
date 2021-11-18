import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity } from "typeorm";

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

}
