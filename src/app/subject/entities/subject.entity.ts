import { BaseEntity } from "@src/core/abstracts/base-entity";
import { Column, Entity } from "typeorm";

@Entity('app-subjects')
export class AppSubject extends BaseEntity{

    constructor(intialData: Partial<AppSubject> = null) {
        super();
        if (intialData !== null) {
            Object.assign(this, intialData);
        }
    }

    @Column({ type: 'varchar', name: 'name' })
    name: string;

}
