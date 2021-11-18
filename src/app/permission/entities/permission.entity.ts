import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity } from "typeorm";

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
}
