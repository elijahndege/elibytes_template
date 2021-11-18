import { CrudRepository } from "@src/core/abstracts/base-repo";
import { EntityRepository } from "typeorm";
import { Role } from "../entities/role.entity";

@EntityRepository(Role)
export class RoleRepository extends CrudRepository<Role> {}