import { CrudRepository } from "@src/core/abstracts/base-repo";
import { EntityRepository } from "typeorm";
import { Permission } from "../entities/permission.entity";

@EntityRepository(Permission)
export class PermissionRepository extends CrudRepository<Permission> {}