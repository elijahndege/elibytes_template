import { CrudRepository } from "@src/core/abstracts/base-repo";
import { Entity, EntityRepository } from "typeorm";
import { AppSubject } from "../entities/subject.entity";

@EntityRepository(AppSubject)
export class AppSubjectRepository extends CrudRepository<AppSubject>{ }