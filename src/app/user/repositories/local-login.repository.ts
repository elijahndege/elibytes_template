import { CrudRepository } from "@src/core/abstracts/base-repo";
import { EntityRepository } from "typeorm";
import { LocalLogin } from "../entities/local-login.entity";

@EntityRepository(LocalLogin)
export class LocalLoginRepository extends CrudRepository<LocalLogin> { }